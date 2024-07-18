import { PrismaClient } from "@prisma/client";
import { TasksTypes } from "../../types/Task_types";
import { userIdOnly } from "../../validators/Category/CreateCategory_Validator";
import { ExistsError } from "../../error/ExistsError";

class GetCategoryService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async execute(userData: TasksTypes) {
    userIdOnly(userData);

        // Verifica se o usuário existe
        const userExist = await this.prisma.user.findUnique({
          where: {
            id: userData.userId
          }
        });
    
        if (!userExist) {
          throw new ExistsError('ID do usuário não existe no banco de dados');
        }

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
