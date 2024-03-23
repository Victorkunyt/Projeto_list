import { PrismaClient } from "@prisma/client";

class GetUsersAllService {
  async execute() {
    const prisma = new PrismaClient();

    const GetUsers = await prisma.user.findMany({});

    if (GetUsers.length === 0) {
      return { message: "Nenhum usuario encontrado" };
    }

    return GetUsers;
  }
}

export { GetUsersAllService };
