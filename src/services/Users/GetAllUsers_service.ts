import { PrismaClient } from "@prisma/client";

class GetUsersAllService {

  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }
  async execute() {

    const GetUsers = await this.prisma.user.findMany({});

    if (GetUsers.length === 0) {
      return { message: "Nenhum usuario encontrado" };
    }

    return GetUsers;
  }
}

export { GetUsersAllService };
