import { FastifyRequest, FastifyReply } from "fastify";
import { UploadImageService } from "../../services/Pictures/UploadImageService";
import { PrismaClient } from "@prisma/client";
import { ExistsError } from "../../error/ExistsError";
import { UserIdImage } from "../../types/Upimage";


interface UploadImageRequest extends FastifyRequest {
  body: {
    userId: any; // ou o tipo apropriado que você está usando
  };
}
class UploadImageController {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async handle(request: UploadImageRequest, reply: FastifyReply): Promise<void> {
    const file = await request.file(); // Captura o arquivo do form-data
    const { userId } = request.body;
    // Verifica se o userId está definido
    if (!userId) {
        reply.status(400).send({ error: 'User ID não fornecido.' });
        return;
    }

    if (!file) {
        reply.status(400).send({ error: 'Arquivo não encontrado no form-data ou acima de 5 MB.' });
        return;
    }

    // Verifica o tipo MIME
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!allowedMimeTypes.includes(file.mimetype)) {
        reply.status(400).send({ error: 'Tipo de arquivo não permitido. Apenas imagens JPEG e PNG são aceitas.' });
        return;
    }

    // Define o tamanho máximo do arquivo (5 MB neste exemplo)
    const maxSizeInBytes = 5 * 1024 * 1024; // 5 MB
    const imageBuffer = await file.toBuffer();

    if (imageBuffer.length > maxSizeInBytes) {
        reply.status(400).send({ error: 'O tamanho do arquivo excede o limite permitido de 5 MB.' });
        return;
    }

    const uploadImageService = new UploadImageService(this.prisma);

    try {
        await uploadImageService.execute(file, userId);
        reply.code(201).send({ message: 'Imagem enviada com sucesso!' });
    } catch (error) {
        if (error instanceof ExistsError) {
            reply.status(400).send({ error: error.message });
        } else {
            console.error('Erro ao enviar imagem:', error);
            reply.status(500).send({ error: 'Erro no servidor', details: error });
        }
    }
}

  
}

export { UploadImageController };
