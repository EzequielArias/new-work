export interface Token {
  refresh_token: string;
  access_token: string;
}

export interface VerifyToken {
  verify_token: string;
}

export interface VerifyTokenPayload {
  sub: string;
  email: string;
}
