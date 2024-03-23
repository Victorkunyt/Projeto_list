import { PrismaClient } from "@prisma/client";
import { TasksTypes } from "../../types/Task_types";
import { TaskID } from "../../validators/Task/TaskIdValidator";

class DeleteTaskService {
  async execute(userData: TasksTypes) {
    const prisma = new PrismaClient();

    TaskID(userData);

    const findId = await prisma.task.findFirst({
      where: {
        id: userData.id,
      },
    });

    if (!findId) {
      throw new Error("Id não existe na base de dados");
    }
    const DeletetaskUsers = await prisma.task.delete({
      where: {
        id: userData.id,
      }
    });

    return DeletetaskUsers;
  }
}

export { DeleteTaskService };
