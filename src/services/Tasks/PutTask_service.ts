import { PrismaClient } from "@prisma/client";
import { TasksTypes,Iduser } from "../../types/Task_types";
import { TaskID,IdUsuario } from "../../validators/Task/TaskIdValidator";
import { TaskCampos } from "../../validators/Task/TaskValidator";

class PutTaskService {
  async execute(userData: TasksTypes, id: Iduser) {
    const prisma = new PrismaClient();

    TaskCampos(userData);
    IdUsuario(id);

    const findId = await prisma.task.findFirst({
      where: {
        id: id.id,
      },
    });

    if (!findId) {
      throw new Error("Id não existe na base de dados");
    }
    const PuttaskUsers = await prisma.task.update({
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
