import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AcademicDto } from './dto';
import { Academic } from './types';

@Injectable()
export class AcademicService {

    constructor(
        private prisma : PrismaService,
    ){}

    async uploadAcademic(userId : string ,dto : AcademicDto) : Promise<void | Error>{

        const date = new Date();
        

        try {
        await this.prisma.academic.create({
            data  : {
                accountId : userId,
                institution : dto.institution,
                start : date,
                end : date,
                description : dto.description
            }
        })    

        } catch (error : any) {
            throw new Error(error.message)
        }
    }

    async getAllAcademics(userId : string) : Promise<Error | Academic[] >{
        try {
            const result = await this.prisma.academic.findMany({
                where : {
                    id : userId
                }
            })

            if(!result) throw new Error('No se encontraron coincidencias');

            return result
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async updateAcademic(userId : string, dto : AcademicDto){
        try {

            const validato = await this.prisma.academic.findUnique({
                where : {
                    id : dto.id
                }
            })

            if(validato.id !== userId) throw new Error('Credentials Invalid'); 

            await this.prisma.academic.update({
                where : {
                    id : dto.id
                },
                data : {
                    institution : dto.institution,
                    description : dto.description,
                    start : dto.start,
                    end : dto.end
                }
            })
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async removeAcademic(userId : string, academicSlotId : string){
        try {

            const validato = await this.prisma.academic.findUnique({
                where : {
                    id : academicSlotId
                }
            })

            if(validato.id !== userId) throw new Error('Credentials Invalid'); 

            await this.prisma.academic.delete({
                where : {
                    id : academicSlotId
                }
            })
        } catch (error) {
            throw new Error(error.message)
        }
    }
}
