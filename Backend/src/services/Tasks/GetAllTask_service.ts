import { PrismaClient } from "@prisma/client";

class GetAllTaskService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }
  
  async execute() {

    const GettaskUsers = await this.prisma.task.findMany({

    });

    if (GettaskUsers.length === 0) {
      return { message: "Nenhuma Task Cadastrada" };
    }

    return GettaskUsers;
  }
}

export { GetAllTaskService };
