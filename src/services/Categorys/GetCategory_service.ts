import { PrismaClient } from "@prisma/client";
import { TasksTypes } from "../../types/Task_types";

class GetCategoryService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async execute(userData: TasksTypes) {
    const Category = await this.prisma.category.findMany({
      include: {
        tasks: {
          include: {
            sharedUsers: true // Inclui as tarefas compartilhadas
          }
        }
      }
    });
    
    if (Category.length === 0) {
      return { message: "Nenhuma categoria encontrada" };
    }

    return { Category };
  }
}

export { GetCategoryService };
