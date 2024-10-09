import { PrismaClient } from "@prisma/client";
import { ExistsError } from "../../error/ExistsError";
import { UserIdImage } from "../../types/Upimage";
import { IMGUserid } from "../../validators/IMG/uploadImageValidator";

class GetImageService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async execute(userData: UserIdImage) {
    IMGUserid(userData); // Valida os parâmetros

    const existingImage = await this.prisma.imageStorage.findFirst({
      where: { userId: userData.userId }, // Usando findUnique para garantir a busca por id
    });

    if (!existingImage) {
      throw new ExistsError("ID não existente");
    }

    return existingImage; // Retornando o objeto existente, que já inclui imageBlob e mimeType
  }
}

export { GetImageService };
