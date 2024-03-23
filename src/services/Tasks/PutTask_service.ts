import { PrismaClient } from "@prisma/client";
import { TasksTypes } from "../../types/Task_types";
import { TaskID } from "../../validators/Task/TaskIdValidator";
import { TaskCampos } from "../../validators/Task/TaskValidator";

class PutTaskService {
  async execute(userData: TasksTypes) {
    const prisma = new PrismaClient();

    TaskCampos(userData);
    TaskID(userData);

    const findId = await prisma.task.findFirst({
      where: {
        id: userData.userId,
      },
    });

    if (!findId) {
      throw new Error("Id não existe na base de dados");
    }
    const PuttaskUsers = await prisma.task.update({
      where: {
        id: userData.userId,
      },
      data: {
        nametask: userData.nametask,
        status: true,
      },
    });

    return PuttaskUsers;
  }
}

export { PutTaskService };
