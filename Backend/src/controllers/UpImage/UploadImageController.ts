import { FastifyRequest, FastifyReply } from "fastify";
import { UploadImageService } from "../../services/UpImage/UploadImageService";
import { PrismaClient } from "@prisma/client";
import { ExistsError } from "../../error/ExistsError";

class UploadImageController {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async handle(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const file = await request.file(); // Captura o arquivo do form-data

    if (!file) {
      reply.status(400).send({ error: 'Arquivo não encontrado no form-data' });
      return;
    }

    const userData = {
      file
    };

    const uploadImageService = new UploadImageService(this.prisma);

    try {
      await uploadImageService.execute(userData);
      reply.code(201).send({ message: 'Imagem enviada com sucesso!' });
    } catch (error) {
      if (error instanceof ExistsError) {
        reply.status(400).send({ error: error.message });
      } else {
        reply.send(error);
      }
    }
  }
}

export { UploadImageController };
