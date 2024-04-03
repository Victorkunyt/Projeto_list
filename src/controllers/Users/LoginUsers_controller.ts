import { FastifyRequest, FastifyReply } from "fastify";
import { LoginService } from "../../services/Users/LoginUsers_service";
import { LogType } from "../../types/Login_types";
import { PrismaClient } from "@prisma/client";


class LoginUserController {
    private prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
      this.prisma = prisma;
    }
    async handle(request: FastifyRequest, response: FastifyReply): Promise<void> {
   
            const userData = request.body as LogType; 
            const LoginUsers = new LoginService(this.prisma);
            const token = await LoginUsers.execute(userData);

            response.send({token});
}
    }


export { LoginUserController };
