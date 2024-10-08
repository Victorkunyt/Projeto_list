import { PrismaClient, ImageStorage } from "@prisma/client";
import { ExistsError } from "../../error/ExistsError";
import { paramImage } from "../../types/Upimage";

class UploadImageService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  // Ajusta a assinatura para retornar o tipo correto
  async execute(userData: paramImage): Promise<ImageStorage> {
    const allowedMimeTypes = ['image/png', 'image/jpg', 'image/jpeg'];

    if (!userData.file) {
      throw new ExistsError('Arquivo não inserido');
    }

    if (!allowedMimeTypes.includes(userData.file.mimetype)) {
      throw new ExistsError('Formato de imagem inválido. Use PNG, JPG ou JPEG.');
    }

    // Converte o arquivo para buffer
    const imageBuffer = await userData.file.toBuffer();

    // Salva a imagem no banco de dados
    const image = await this.prisma.imageStorage.create({
      data: {
        imageBlob: imageBuffer,
        mimeType: userData.file.mimetype,
      },
    });

    return image; // Agora estamos retornando a imagem criada
  }
}

export { UploadImageService };
