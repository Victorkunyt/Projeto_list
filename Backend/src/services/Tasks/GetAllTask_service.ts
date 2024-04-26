import { PrismaClient } from "@prisma/client";
import { userIdOnly } from "../../validators/Category/CreateCategory_Validator";
import { TasksTypes } from "../../types/Task_types";

class GetAllTaskService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }
  
  async execute(userData: TasksTypes) {

    userIdOnly(userData)

    const GettaskUsers = await this.prisma.task.findMany({

      where: {
        userId: userData.userId

      }

    });

    if (GettaskUsers.length === 0) {
      return { message: "Nenhuma Task Cadastrada" };
    }

    return GettaskUsers;
  }
}

export { GetAllTaskService };
