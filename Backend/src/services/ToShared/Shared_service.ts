import { PrismaClient } from "@prisma/client";
import { LineShared } from "../../types/Shared_types";
import { SharedCampos } from "../../validators/ToShared/TosharedValidator";
import { registerNotification } from "../../functions/SendNotification";
import { ExistsError } from "../../error/ExistsError";

class ToSharedService {

  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }
  async execute(userData: LineShared) {
    SharedCampos(userData);

    // Validar se a task existe
    const task = await this.prisma.task.findUnique({
        where: {
            id: userData.idTask,
        },
    });
    if (!task) {
        throw new ExistsError("Tarefa não encontrada");
    }

    // Validar se o usuário está tentando compartilhar a tarefa consigo mesmo
    if (task.userId === userData.idUser) {
        throw new ExistsError("Usuário não pode compartilhar a tarefa consigo mesmo");
    }

    // Validar se o usuário existe
    const userToShareWith = await this.prisma.user.findUnique({
        where: {
            id: userData.idUser,
        },
    });
    if (!userToShareWith) {
        throw new ExistsError("Usuário para compartilhar não encontrado");
    }

    // Validar se a categoria da tarefa é a mesma que a categoria especificada para compartilhamento
    if (task.categoryId !== userData.categoryId) {
        throw new ExistsError("A categoria da tarefa não coincide com a Task especificada para compartilhamento");
    }


    // Validar se a tarefa já foi compartilhada para esse usuário
    const existTaskUser = await this.prisma.sharedTask.findFirst({
        where: {
            categoryId: userData.categoryId,
            userId: userData.idUser,
            taskId: userData.idTask,
        },
    });

    if (existTaskUser) {
        throw new ExistsError("Usuário já tem a tarefa compartilhada");
    }

    // Compartilhar task com outro usuário
    await this.prisma.sharedTask.create({
        data: {
            categoryId: userData.categoryId,
            userId: userData.idUser,
            taskId: userData.idTask,
        },
    });

    await registerNotification(this.prisma, "Task Compartilhada com outro Usuario com Sucesso", userToShareWith.id);
}

}

export { ToSharedService };
