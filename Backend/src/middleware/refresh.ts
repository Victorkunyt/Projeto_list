import dayjs from "dayjs";
import { PrismaClient } from "@prisma/client";

class GenerateRefreshToken {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async execute(UserId: string) {
    try {
      const expiresIn = dayjs().add(6000, "minute").unix(); // 60 Minutos
      const generateRefreshToken = await this.prisma.refreshToken.create({
        data: {
          UserId,
          expiresIn,
        },
      });

      return { generateRefreshToken };
    } catch (error) {
      console.error("Error generating refresh token:", error);
      throw new Error("Could not generate refresh token");
    }
  }
}

export { GenerateRefreshToken };
