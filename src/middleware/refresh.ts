import prismaClient from "../../src/prisma";
import dayjs from "dayjs";

class GenerateRefrashToken {
  async execute(UserId: string) {
    const expiresIn = dayjs().add(90, "seconds").unix();
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
