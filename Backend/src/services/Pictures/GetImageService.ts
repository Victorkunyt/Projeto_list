import { PrismaClient } from "@prisma/client";
import { ExistsError } from "../../error/ExistsError";
import { paramImage } from "../../types/Upimage";
class GetImageService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async execute(userData: paramImage) {


    const existingImage = await this.prisma.imageStorage.findFirst({
      where: { 
        id: userData.id
      },
    });

    if (!existingImage) {
      throw new ExistsError("id não existente");
    }

    return Buffer.from(existingImage.imageBlob); // Convertendo para Buffer

  }
}

export { GetImageService };
