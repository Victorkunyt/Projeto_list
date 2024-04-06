import { FastifyRequest, FastifyReply } from "fastify";
import { DeleteUsersAllService } from "../../services/Users/DeleteUserAll_service";
import { PrismaClient } from "@prisma/client";

class DeleteUsersAllController {
    private prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
      this.prisma = prisma;
    }
    async handle(request: FastifyRequest,response: FastifyReply): Promise<void> {
   
            const serviceUsersDelete = new DeleteUsersAllService(this.prisma);
            await serviceUsersDelete.execute();

            response.code(204);
}
    }


export { DeleteUsersAllController };
