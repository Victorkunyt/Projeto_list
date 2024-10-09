import { GetImageService } from "../../services/Pictures/GetImageService";
import { FastifyRequest, FastifyReply } from "fastify";
import { UserIdImage } from "../../types/Upimage";
import { PrismaClient } from "@prisma/client";
import { ExistsError } from "../../error/ExistsError";

class GetImageController {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async handle(request: FastifyRequest, response: FastifyReply): Promise<void> {
    const userData = request.query as UserIdImage;
    const imageService = new GetImageService(this.prisma);

    try {
      const existingImage = await imageService.execute(userData);

      // Definindo o tipo MIME da imagem para a resposta
      response.header('Content-Type', existingImage.mimeType);
      response.send(existingImage.imageBlob); // Enviando o buffer da imagem
    } catch (error) {
      if (error instanceof ExistsError) {
        response.status(404).send({ error: error.message }); // 404 para recurso não encontrado
      } else {
        console.error('Erro ao buscar a imagem:', error);
        response.status(500).send({ error: 'Erro no servidor', details: error });
      }
    }
  }
}

export { GetImageController };
