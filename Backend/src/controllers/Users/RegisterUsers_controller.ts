import { FastifyRequest, FastifyReply } from "fastify";
import { UsersService } from "../../services/Users/RegisterUsers_service";
import { UserTypes } from "../../types/Users_types";
import { PrismaClient } from "@prisma/client";


class UsersCreateController {

    private prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
      this.prisma = prisma;
    }

    async handle(request: FastifyRequest, response: FastifyReply): Promise<void> {
   
            const userData = request.body as UserTypes; 
            const serviceUsers = new UsersService(this.prisma);
            await serviceUsers.execute(userData);

            response.code(201)
}
    }


export { UsersCreateController };
