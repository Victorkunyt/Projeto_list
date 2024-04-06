import { PrismaClient } from "@prisma/client";
import { Iduser } from '../../types/Task_types';
import { IdUsuario } from "../../validators/Task/TaskIdValidator";

class DeleteTaskService {

  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }
  async execute(userData: Iduser) {

    IdUsuario(userData)
    const findId = await this.prisma.task.findFirst({
      where: {
        id: userData.id,
      },
    });

    if (!findId) {
      throw new Error("Id da Task não existe na base de dados");
    }
    const DeletetaskUsers = await this.prisma.task.delete({
      where: {
        id: userData.id,
      }
    });

    return DeletetaskUsers;
  }
}

export { DeleteTaskService };
