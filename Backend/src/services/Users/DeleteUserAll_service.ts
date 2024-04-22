import { PrismaClient } from "@prisma/client";

class DeleteUsersAllService {

  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }
  async execute() {

    await this.prisma.refreshToken.deleteMany({});

    await this.prisma.notification.deleteMany({})

    const helpUser = await this.prisma.user.deleteMany({
      
    });
    if (helpUser.count === 0) {
      throw new Error("Nenhum usuario para deletar");
    }
  }
}

export { DeleteUsersAllService };
