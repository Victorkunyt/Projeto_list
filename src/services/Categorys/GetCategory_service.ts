import { PrismaClient } from "@prisma/client";
import { TasksTypes } from "../../types/Task_types";


class GetCategoryService {
  async execute(userData: TasksTypes) {
    const prisma = new PrismaClient();

    const Category = await prisma.category.findMany({});

    if (Category.length === 0) {
      return { message: "Nenhuma categoria encontrada" };
    }

    const ArrayTasks = await prisma.task.findMany({

      where: {
        nametask: userData.nametask,
      },
      include: {
        user: true,
      },
    })

    return {Category,Tasks: ArrayTasks}

 
  }
}

export { GetCategoryService };
