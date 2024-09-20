import { FastifyRequest, FastifyReply } from "fastify";
import { CategoryService } from "../../services/Categorys/CreateCategory_service";
import { PayloadCategory } from "../../types/Category_types";
import { PrismaClient } from "@prisma/client";
import { ExistsError } from "../../error/ExistsError";

class CategoryCreateController {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async handle(request: FastifyRequest, response: FastifyReply): Promise<void> {
    const userData = request.body as PayloadCategory;
    const Category = new CategoryService(this.prisma);

    try {
      const responseData = await Category.execute(userData);
      response.code(201).send({ id: responseData.id });
    } catch (error) {
      if (error instanceof ExistsError) {
        response.status(400).send({ error: error.message });
      } else {
        response.send(error)
      }
    }
  }
}

export { CategoryCreateController };
