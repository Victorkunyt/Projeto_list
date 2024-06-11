import dayjs from "dayjs";
import { PrismaClient } from "@prisma/client";
class GenerateRefrashToken {

  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }
  async execute(UserId: string) {
    const expiresIn = dayjs().add(8000, "seconds").unix(); // 80 Minutos
    const generateRefreshToken = await this.prisma.refreshToken.create({
      data: {
        UserId,
        expiresIn,
      },
    });

    return { generateRefreshToken };
  }
}

export { GenerateRefrashToken };
