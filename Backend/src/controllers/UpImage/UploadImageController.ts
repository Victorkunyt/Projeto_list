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
  
    // Verifica o tipo MIME aqui, caso deseje validar antes de passar ao serviço
    const allowedMimeTypes = ['image/jpeg'];
    if (!allowedMimeTypes.includes(file.mimetype)) {
      reply.status(400).send({ error: 'Tipo de arquivo não permitido. Apenas imagens JPEG são aceitas.' });
      return;
    }
  
    const uploadImageService = new UploadImageService(this.prisma);
  
    try {
      // Passa o arquivo diretamente para o serviço
      await uploadImageService.execute(file);
      
      reply.code(201).send({ message: 'Imagem enviada com sucesso!' });
    } catch (error) {
      if (error instanceof ExistsError) {
        reply.status(400).send({ error: error.message });
      } else {
        console.error('Erro ao enviar imagem:', error); // Adicione logging
        reply.status(500).send({ error: 'Erro no servidor', details: error });
      }
    }
  }
  
}

export { UploadImageController };
