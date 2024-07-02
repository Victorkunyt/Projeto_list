import { FastifyRequest, FastifyReply } from "fastify";
import { GetCategoryService } from "../../services/Categorys/GetCategory_service";
import { TasksTypes } from "../../types/Task_types";
import { PrismaClient } from "@prisma/client";
import { ExistsError } from "../../error/ExistsError";

class GetCategoryController {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async handle(request: FastifyRequest, response: FastifyReply): Promise<void>  {
    const userData = request.query as TasksTypes;
    const categoryService = new GetCategoryService(this.prisma);
    try {
      const returnCategorys = await categoryService.execute(userData);
      return response.send(returnCategorys);
    } catch (error) {
      if (error instanceof ExistsError) {
        response.status(400).send({ error: error.message });
      } else {
        response.send(error)
      }
    }

  }
}

export { GetCategoryController };
