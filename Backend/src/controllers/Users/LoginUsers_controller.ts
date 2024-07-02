import { FastifyRequest, FastifyReply } from "fastify";
import { LoginService } from "../../services/Users/LoginUsers_service";
import { LogType } from "../../types/Login_types";
import { PrismaClient } from "@prisma/client";
import { ExistsError } from "../../error/ExistsError";

class LoginUserController {
    private prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
      this.prisma = prisma;
    }
    async handle(request: FastifyRequest, response: FastifyReply): Promise<void> {
   
            const userData = request.body as LogType; 
            const LoginUsers = new LoginService(this.prisma);
            try {
              const token = await LoginUsers.execute(userData);
              response.send(token);
            } catch (error) {
              if (error instanceof ExistsError) {
                response.status(400).send({ error: error.message });
              } else {
                response.send(error)
              }
            }

}
    }


export { LoginUserController };
