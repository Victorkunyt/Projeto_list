import { PrismaClient } from "@prisma/client";
import { TasksTypes } from "../../types/Task_types";
import { userIdOnly } from "../../validators/Category/CreateCategory_Validator";

class GetCategoryService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async execute(userData: TasksTypes) {
    userIdOnly(userData);

      const Category = await this.prisma.category.findMany({
        where: {
          userId: userData.userId
        },
        include: {
          tasks: true,
          sharedTasks: true  
        }
      });
      
      if (!Category) {
        return { message: "Categoria não encontrada para o usuário" };
      }

      return { Category };

  }
}

export { GetCategoryService };
