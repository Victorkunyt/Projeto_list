import { PrismaClient } from "@prisma/client";

class GetAllTaskService {
  async execute() {
    const prisma = new PrismaClient();

    const GettaskUsers = await prisma.task.findMany({});

    if (GettaskUsers.length === 0) {
      return { message: "Nenhuma Task Cadastrada" };
    }

    return GettaskUsers;
  }
}

export { GetAllTaskService };
