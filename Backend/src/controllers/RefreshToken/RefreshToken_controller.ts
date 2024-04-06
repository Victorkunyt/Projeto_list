import { FastifyRequest, FastifyReply } from "fastify";
import { Refresh_token } from "../../services/RefreshToken/RefreshToken_service";
import {LogType} from "../../types/Login_types";
import { PrismaClient } from "@prisma/client";


class Refresh_tokenController {
    
    private prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
      this.prisma = prisma;
    }
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const userData = request.body as LogType
        
        const generateToken = new Refresh_token(this.prisma);
        
        const token = await generateToken.execute(userData); 
        
        return token
    }
}

export { Refresh_tokenController };