import { FastifyRequest, FastifyReply } from "fastify";
import { DeleteUsersService } from "../../services/Users/DeleteUsers_service";
import { PrismaClient } from "@prisma/client";
import { Iduser } from "../../types/Task_types";
class DeleteUsersController {
    private prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
      this.prisma = prisma;
    }
    async handle(request: FastifyRequest,response: FastifyReply): Promise<void> {
   
            const userData = request.query as Iduser
            const serviceUsersDelete = new DeleteUsersService(this.prisma);
            await serviceUsersDelete.execute(userData);

            response.code(204);
}
    }


export { DeleteUsersController };
