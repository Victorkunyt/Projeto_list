import { PrismaClient } from "@prisma/client";
import { TasksTypes } from "../../types/Task_types";
import { TaskCampos } from "../../validators/Task/TaskValidator";
import { TaskID } from "../../validators/Task/TaskIdValidator";
import { registerNotification } from "../../functions/SendNotification";

class TaskService {

  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }
  async execute(userData: TasksTypes) {
   

    TaskCampos(userData);
    TaskID(userData);

    const ValidationComponente = await this.prisma.user.findFirst({
      where: {
        id: userData.userId,
      },
    });

    if (!ValidationComponente) {
      throw new Error("User Id de usuario inválido");
    }

    const ValidationCategoryid = await this.prisma.category.findFirst({
        where: {
          id: userData.categoryId,
        },
      });
  
      if (!ValidationCategoryid) {
        throw new Error("Category da task inválido");
      }

      const VerificationCategopyUser = await this.prisma.category.findFirst({
        where: {
          id: userData.categoryId 
        }
      });
      
      if (!VerificationCategopyUser || VerificationCategopyUser.userId !== userData.userId) {
        throw new Error("Não é possível criar uma tarefa com uma categoria que não pertence ao usuário.");
      }

    const taskUsers = await this.prisma.task.create({
      data: {
        nametask: userData.nametask,
        categoryId: userData.categoryId,
        userId: userData.userId,
        status: true,
      },
    });

    await registerNotification(this.prisma,"Sua Tarefa foi registrada com Sucesso", userData.userId);

    return taskUsers;
  }
}

export { TaskService };
