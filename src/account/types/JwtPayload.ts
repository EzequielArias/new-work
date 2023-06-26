export type JwtPayload = {
  email: string;
  sub: string;
  rol: string;
};

export interface HeadersJwt extends JwtPayload {
  iat: number;
  exp: number;
}
