import { FastifyRequest, FastifyReply } from "fastify";
import { DeleteCategoryService } from "../../services/Categorys/DeleteCategory_service";
import { Iduser } from "../../types/Task_types";
import { PrismaClient } from "@prisma/client";

class CategoryDeleteController {
    private prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
      this.prisma = prisma;
    }
    async handle(request: FastifyRequest, response: FastifyReply): Promise<void> {
   
            const userData = request.query as Iduser; 
            const DeleteCategoryUsers = new DeleteCategoryService(this.prisma);
            await DeleteCategoryUsers.execute(userData);

            response.code(204);
}
    }


export { CategoryDeleteController };
