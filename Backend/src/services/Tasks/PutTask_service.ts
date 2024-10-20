import { PrismaClient } from "@prisma/client";
import { TasksTypes,Iduser } from "../../types/Task_types";
import { IdTask } from "../../validators/Task/TaskIdValidator";
import { TaskCampos } from "../../validators/Task/TaskValidator";
import { ExistsError } from "../../error/ExistsError";

class PutTaskService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }
  async execute(userData: TasksTypes, id: Iduser) {

    TaskCampos(userData);
    IdTask(id);

    const findId = await this.prisma.task.findFirst({
      where: {
        id: id.id,
      },
    });

    if (!findId) {
      throw new ExistsError("Id não existe na base de dados");
    }
    const PuttaskUsers = await this.prisma.task.update({
      where: {
        id: id.id,
      },
      data: {
        nametask: userData.nametask,
        status: true,
      },
    });

    return {PuttaskUsers};
  }
}

export { PutTaskService };
