import { PrismaClient } from "@prisma/client";
import { Id } from '../../types/Task_types';
import { IdTask } from "../../validators/Task/TaskIdValidator";
import { ExistsError } from "../../error/ExistsError";

class DeleteTaskService {

  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }
  async execute(userData: Id) {

    IdTask(userData)
    const findId = await this.prisma.task.findFirst({
      where: {
        id: userData.id,
      },
    });

    if (!findId) {
      throw new ExistsError("Id da Task não existe na base de dados");
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
