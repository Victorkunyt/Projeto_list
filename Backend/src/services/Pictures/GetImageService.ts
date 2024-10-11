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

    if (userData.userId !== existingImage?.userId) {
      throw new ExistsError("Id não pertence ao do Usuario");
    }
    if (!existingImage) {
      throw new ExistsError("Usuário não contem foto guardada no banco de dados");
    }



    return existingImage; // Retornando o objeto existente, que já inclui imageBlob e mimeType
  }
}

export { GetImageService };
