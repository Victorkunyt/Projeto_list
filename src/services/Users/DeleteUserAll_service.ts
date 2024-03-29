import { PrismaClient } from "@prisma/client";

class DeleteUsersAllService {
  async execute() {
    const prisma = new PrismaClient();

    await prisma.refreshToken.deleteMany({});

    const helpUser = await prisma.user.deleteMany({
      
    });
    if (helpUser.count === 0) {
      throw new Error("Nenhum usuario para deletar");
    }
  }
}

export { DeleteUsersAllService };
