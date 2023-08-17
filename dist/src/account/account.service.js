"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const jwt_1 = require("@nestjs/jwt");
const argon = require("argon2");
const config_1 = require("@nestjs/config");
const nodemailer = require("nodemailer");
const nodemailer_sendgrind = require("nodemailer-sendgrid");
const firebase_service_1 = require("../firebase/firebase.service");
const utils_1 = require("../utils");
let AccountService = exports.AccountService = class AccountService {
    constructor(prisma, JwtService, config, firebase) {
        this.prisma = prisma;
        this.JwtService = JwtService;
        this.config = config;
        this.firebase = firebase;
    }
    async updateRt(userId, rt) {
        const hash = await argon.hash(rt);
        await this.prisma.account.update({
            where: {
                id: userId,
            },
            data: {
                rt_hash: hash,
            },
        });
    }
    async getToken(userId, email) {
        const associated = await this.prisma.account.findUnique({
            where: {
                email: email,
            },
            include: {
                type_rol: true,
            },
        });
        const jwtPayload = {
            sub: userId,
            email,
            rol: associated.type_rol.rol,
        };
        const [at, rt] = await Promise.all([
            this.JwtService.signAsync(jwtPayload, {
                secret: this.config.get('AT-SECRET') || 'at',
                expiresIn: '1h',
            }),
            this.JwtService.signAsync(jwtPayload, {
                secret: this.config.get('RT-SECRET') || 'rt',
                expiresIn: '7d',
            }),
        ]);
        return {
            access_token: at,
            refresh_token: rt,
        };
    }
    async verifyToken(userId, email) {
        const jwtPayload = {
            sub: userId,
            email,
        };
        try {
            const [vt] = await Promise.all([
                this.JwtService.signAsync(jwtPayload, {
                    secret: this.config.get('VT-SECRET') || 'vt',
                    expiresIn: '10m',
                }),
            ]);
            return {
                verify_token: vt,
            };
        }
        catch (error) {
            console.log(error);
        }
    }
    async sendVerificationEmail(email, userId) {
        try {
            let token = await this.verifyToken(userId, email);
            const HTMLtemplate = `<!DOCTYPE html>
      <html lang="en">
      
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap" rel="stylesheet">
          <title>Document</title>
          <style>
              * {
                  box-sizing: border-box;
                  margin: 0
              }
      
              div {
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  justify-content: center;
                  color: black;
                  background-color: azure;
                  height: 85vh
              }
      
              img {
                  height: 90px;
                  width: 90px;
                  margin-bottom: 50px
              }
      
              p {
                  text-align: center;
                  margin-bottom: 1em;
                  font-family: 'Roboto', sans-serif
              }
      
              button {
                  padding: 1em;
                  font-size: 1em
              }
      
              a {
                  text-decoration: none;
                  color: black
              }
      
              footer {
                  height: 15vh;
                  background-color: cadetblue
              }
      
              .p-pd {
                  margin-top: 10px;
                  font-size: .7em
              }
      
              footer {
                  color: white;
                  text-align: center
              }
      
              footer a {
                  color: white
              } 
      
              footer a:hover {
                  color: black;
              }
      
          </style>
      </head>
      
      <body>
          <div><img src="../assets/emailCheck.png" alt="emailCheck" />
              <p>Haz click en el boton para verificar tu cuenta de email!</p><button><a href="localhost:8080/verify-account">Click me</a></button>
              <p class="p-pd">El boton solo es valido durante 15 minutos</p>
          </div>
          <footer>
              <p>This website was made by <a href="" id="btn">Ezequiel Arias</a></p>
          </footer>
          <script>
              const btn = document.getElementById('btn');
              btn.addEventListener('click', () => {
                  fetch('http://localhost:8080/verify-account',{
                      method : 'POST',
                      headers : {
                          'Authorization' : '${token}'
                      }
                  })
                  .then(res => res.json())
                  .catch(err => console.log(err))
              })
          </script>
      </body>
      
      </html>`;
            const transport = nodemailer.createTransport(nodemailer_sendgrind({
                apiKey: this.config.get('SENDGRIND_KEY'),
            }));
            await transport.sendMail({
                from: 'ezequielariasdev@gmail.com',
                to: email,
                subject: 'Email de verificacion',
                html: HTMLtemplate,
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    async verifyAccount(userId) {
        try {
            await this.prisma.account.update({
                where: {
                    id: userId,
                },
                data: {
                    isVerified: true,
                },
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    async signup(data) {
        try {
            const hash = await argon.hash(data.password);
            const newUser = await this.prisma.account.create({
                data: {
                    name: data.name,
                    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS45h4o2Zz779xVIm5pSrxTSwTAKViflqRQXF9NYJpjrxl7u0wgYwZi-usOt_EMM64GH9c&usqp=CAU',
                    email: data.email,
                    password: hash,
                    Type_rol_id: data.Type_rol_id
                        ? data.Type_rol_id
                        : '7b8a9c10-11d1-80b4-00c04fd430c8',
                },
            });
            if (data.image) {
                const url = await this.firebase.uploadFiles(data.image, newUser.id, false);
                await this.prisma.account.update({
                    where: {
                        id: newUser.id,
                    },
                    data: {
                        image: url,
                    },
                });
            }
            const tokens = await this.getToken(newUser.id, newUser.email);
            await this.updateRt(newUser.id, tokens.refresh_token);
            await this.sendVerificationEmail(newUser.email, newUser.id);
            const currentUser = {
                name: newUser.name,
                email: newUser.email,
                image: newUser.image
            };
            return {
                ok: true,
                statusCode: 201,
                payload: {
                    currentUser,
                    tokens,
                }
            };
        }
        catch (err) {
            const res = new utils_1.CustomErr();
            throw res.nestErr(err);
        }
    }
    async signin(email, pass) {
        try {
            const user = await this.prisma.account.findUnique({
                where: {
                    email: email,
                },
            });
            if (!user)
                throw new common_1.ForbiddenException('Email o contraseña son invalidos');
            const verify = await argon.verify(user.password, pass);
            if (!verify)
                throw new common_1.ForbiddenException('Email o contraseña son invalidos');
            const tokens = await this.getToken(user.id, user.email);
            await this.updateRt(user.id, tokens.refresh_token);
            const currentUser = {
                name: user.name,
                email: user.email,
                image: user.image
            };
            return {
                ok: true,
                statusCode: 200,
                payload: {
                    currentUser,
                    tokens,
                }
            };
        }
        catch (err) {
            const res = new utils_1.CustomErr();
            return res.nestErr(err);
        }
    }
    async logout(userId) {
        await this.prisma.account.update({
            where: {
                id: userId,
            },
            data: {
                rt_hash: null,
            },
        });
    }
    async getUserRegister(userId) {
        if (!userId)
            throw new Error('Acesso denegado');
        try {
            const usr = await this.prisma.account.findUnique({
                where: {
                    id: userId
                },
                select: {
                    image: true,
                    name: true,
                    email: true
                }
            });
            if (!usr)
                throw new Error('Sin coincidencias');
            return usr;
        }
        catch (err) {
            const res = new utils_1.CustomErr();
            return res.nestErr(err);
        }
    }
};
exports.AccountService = AccountService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        config_1.ConfigService,
        firebase_service_1.FirebaseService])
], AccountService);
//# sourceMappingURL=account.service.js.map