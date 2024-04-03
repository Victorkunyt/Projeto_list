import { FastifyRequest, FastifyReply } from "fastify";
import { CategoryService } from "../../services/Categorys/CreateCategory_service";
import { PayloadCategory } from "../../types/Category_types";
import { PrismaClient } from "@prisma/client";


class CategoryCreateController {

    private prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
      this.prisma = prisma;
    }

    async handle(request: FastifyRequest, response: FastifyReply): Promise<void> {
   
            const userData = request.body as PayloadCategory; 
            const Category = new CategoryService(this.prisma);
            await Category.execute(userData);

            response.code(201)
}
    }


export { CategoryCreateController };
