import prismaClient from "../../src/prisma";
import dayjs from "dayjs";

class GenerateRefrashToken {
  async execute(UserId: string) {
    const expiresIn = dayjs().add(2000, "seconds").unix(); // 20 Minutos
    const generateRefreshToken = await prismaClient.refreshToken.create({
      data: {
        UserId,
        expiresIn,
      },
    });

    return { generateRefreshToken };
  }
}

export { GenerateRefrashToken };
