import { PrismaClient } from "@prisma/client";
import { LineShared } from "../../types/Shared_types";
import { SharedCampos } from "../../validators/ToShared/TosharedValidator";
import { registerNotification } from "../../functions/SendNotification";


const prisma = new PrismaClient();

class ToSharedService {
  async execute(userData: LineShared) {
    SharedCampos(userData);

    // Validar se a task existe
    const task = await prisma.task.findUnique({
      where: {
        id: userData.idTask,
      },
    });
    if (!task) {
      throw new Error("Tarefa não encontrada");
    }
    // Validar se o usuario existe
    const userToShareWith = await prisma.user.findUnique({
      where: {
        id: userData.idUser,
      },
    });
    if (!userToShareWith) {
      throw new Error("Usuário para compartilhar não encontrado");
    }

    // Validar se a tarefa já foi compartilhada para esse usuário
    const existTaskUser = await prisma.sharedTask.findFirst({
      where: {
        userId: userData.idUser,
        taskId: userData.idTask,
      },
    });

    if (existTaskUser) {
      throw new Error("Usuário já tem a tarefa compartilhada");
    }

    // Validar se o usuário está tentando compartilhar a tarefa consigo mesmo
    if (task.userId === userData.idUser) {
      throw new Error("Usuário não pode compartilhar a tarefa consigo mesmo");
    }

    // compartilhar task com outro usuario

    await prisma.sharedTask.create({
      data: {
        userId: userData.idUser,
        taskId: userData.idTask,
      },
    });

    await registerNotification("Task Compartilhada com outro Usuario com Sucesso", userToShareWith.id);

  }
}

export { ToSharedService };
