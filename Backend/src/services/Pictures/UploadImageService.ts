import { PrismaClient } from "@prisma/client";
import { ExistsError } from "../../error/ExistsError";
import { MultipartFile } from "fastify-multipart";
import { IMGUserid } from "../../validators/IMG/uploadImageValidator";
import { UserIdImage } from "../../types/Upimage";

class UploadImageService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  // Método responsável por armazenar a imagem no banco de dados
  async execute(file: MultipartFile,userData: UserIdImage): Promise<void> {
    IMGUserid(userData)

    const iduserServer = await this.prisma.user.findFirst({
      where: {
          id: userData.userId
      }
  });

  if (!iduserServer) {
      throw new ExistsError('Usuário não encontrado');
  }

    // Converte a imagem para buffer
    const imageBuffer = await file.toBuffer();

    // Salva a imagem no banco de dados
    await this.prisma.imageStorage.create({
      data: {
        imageBlob: imageBuffer,
        userId: userData.userId,     // Armazena a imagem em formato binário
        mimeType: file.mimetype,
        size: imageBuffer.length,    // Armazena o tipo MIME da imagem
      },
    });
  }
}

export { UploadImageService };