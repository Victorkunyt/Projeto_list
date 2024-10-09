import { PrismaClient } from "@prisma/client";
import { ExistsError } from "../../error/ExistsError";
import { MultipartFile } from "fastify-multipart"; // Tipagem correta do arquivo
import { IMGUserid } from "../../validators/IMG/uploadImageValidator";

class UploadImageService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  // Método responsável por armazenar a imagem no banco de dados
  async execute(file: MultipartFile,userData: any): Promise<void> {
    IMGUserid(userData)
    // Converte a imagem para buffer
    const imageBuffer = await file.toBuffer();

    // Verifica se já existe uma imagem com o mesmo MIME type (opcional)
    const existingImage = await this.prisma.imageStorage.findFirst({
      where: { 
        mimeType: file.mimetype },
    });

    const existingUserid = await this.prisma.user.findFirst({
      where: { 
        id: userData },
    });

    if (existingImage === existingUserid) {
      throw new ExistsError("Uma imagem com o mesmo tipo MIME já existe para esse User");
    }

    // Salva a imagem no banco de dados
    await this.prisma.imageStorage.create({
      data: {
        userId: userData,
        imageBlob: imageBuffer,     // Armazena a imagem em formato binário
        mimeType: file.mimetype,
        size: imageBuffer.length,    // Armazena o tipo MIME da imagem
      },
    });
  }
}

export { UploadImageService };
