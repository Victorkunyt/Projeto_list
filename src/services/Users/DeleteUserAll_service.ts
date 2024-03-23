import { PrismaClient } from "@prisma/client";

class DeleteUsersAllService {
  async execute() {
    const prisma = new PrismaClient();

    await prisma.user.deleteMany({});

    }
}

export { DeleteUsersAllService };
