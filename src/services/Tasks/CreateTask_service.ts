import { PrismaClient } from "@prisma/client";
import { TasksTypes } from "../../types/Task_types";
import { TaskCampos } from "../../validators/Task/TaskValidator";
import { TaskID } from "../../validators/Task/TaskIdValidator";
import { registerNotification } from "../../functions/SendNotification";

const prisma = new PrismaClient();
class TaskService {
  async execute(userData: TasksTypes) {
   

    TaskCampos(userData);
    TaskID(userData);

    const ValidationComponente = await prisma.user.findFirst({
      where: {
        id: userData.userId,
      },
    });

    if (!ValidationComponente) {
      throw new Error("User Id de usuario inválido");
    }

    const ValidationCategoryid = await prisma.category.findFirst({
        where: {
          id: userData.categoryId,
        },
      });
  
      if (!ValidationCategoryid) {
        throw new Error("Category da task inválido");
      }

  await registerNotification("Sua Task foi registrada com Sucesso", userData.userId);


    const taskUsers = await prisma.task.create({
      data: {
        nametask: userData.nametask,
        categoryId: userData.categoryId,
        userId: userData.userId,
        status: true,
      },
    });

    return taskUsers;
  }
}

export { TaskService };
