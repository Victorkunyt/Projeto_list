import { PrismaClient } from "@prisma/client";

class GetSharedTaskService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }
  
  async execute() {

    const GetSharedTask = await this.prisma.sharedTask.findMany({
    });

    if (GetSharedTask.length === 0) {
      return { message: "Nenhuma Task Compartilhada Cadastrada" };
    }

    return GetSharedTask;
  }
}

export { GetSharedTaskService };
