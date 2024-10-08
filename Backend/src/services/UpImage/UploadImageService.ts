import { PrismaClient } from "@prisma/client";
import { ExistsError } from "../../error/ExistsError";
import { MultipartFile } from "fastify-multipart"; // Tipagem correta do arquivo

class UploadImageService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  // Método responsável por armazenar a imagem no banco de dados
  async execute(file: MultipartFile): Promise<void> {
    // Tipos MIME permitidos

    // Converte a imagem para buffer
    const imageBuffer = await file.toBuffer();

    // Verifica se já existe uma imagem com o mesmo MIME type (opcional)
    const existingImage = await this.prisma.imageStorage.findFirst({
      where: { mimeType: file.mimetype },
    });

    if (existingImage) {
      throw new ExistsError("Uma imagem com o mesmo tipo MIME já existe.");
    }

    // Salva a imagem no banco de dados
    await this.prisma.imageStorage.create({
      data: {
        imageBlob: imageBuffer,     // Armazena a imagem em formato binário
        mimeType: file.mimetype,    // Armazena o tipo MIME da imagem
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  }
}

export { UploadImageService };
