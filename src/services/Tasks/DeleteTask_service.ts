import { PrismaClient } from "@prisma/client";
import { Iduser } from '../../types/Task_types';
import { IdUsuario } from "../../validators/Task/TaskIdValidator";

class DeleteTaskService {
  async execute(userData: Iduser) {
    const prisma = new PrismaClient();

    IdUsuario(userData)
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
