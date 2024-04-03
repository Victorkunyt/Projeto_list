import { FastifyRequest, FastifyReply } from "fastify";
import { GetCategoryService } from "../../services/Categorys/GetCategory_service";
import { TasksTypes } from "../../types/Task_types";
import { PrismaClient } from "@prisma/client";

class GetCategoryController {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async handle(request: FastifyRequest, response: FastifyReply): Promise<void>  {
    const userData = request.query as TasksTypes;
    const categoryService = new GetCategoryService(this.prisma);
    const returnCategorys = await categoryService.execute(userData);

    return response.send(returnCategorys);
  }
}

export { GetCategoryController };
