import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { verify } from "jsonwebtoken";
import { VerifyTokenPayload } from "src/account/types";

export const GetCurrentEmail = createParamDecorator(
    (_: undefined, context: ExecutionContext) => {
    const req : Request = context.switchToHttp().getRequest();
    let config : ConfigService ;
    const token : string = req.headers['authorization']
    .replace('Bearer', '')
    .trim()
    const user = verify(token,'at') as VerifyTokenPayload
    return user.sub
})