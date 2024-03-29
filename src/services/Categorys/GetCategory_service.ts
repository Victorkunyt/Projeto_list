import { PrismaClient } from "@prisma/client";
import { TasksTypes } from "../../types/Task_types";


class GetCategoryService {
  async execute(userData: TasksTypes) {
    const prisma = new PrismaClient();

    const Category = await prisma.category.findMany({

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



    return {Category}

 
  }
}

export { GetCategoryService };
