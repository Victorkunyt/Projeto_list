import { FastifyRequest, FastifyReply } from "fastify";
import { GeneratePdfService } from "../../services/GeneratePdf/GeneratePdf_service";
import { UserNames } from '../../types/PdfGenerator_types';
import { PrismaClient } from "@prisma/client";

class PdfDownloadController {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async handle(request: FastifyRequest, response: FastifyReply): Promise<void> {
    const userData = request.query as UserNames

    try {
      const pdfData = await this.prisma.pdfStorage.findMany({
        where: {
          userId: userData.userId
        },
      });

      if (!pdfData) {
        response.status(404).send({ message: 'PDF not found' });
        return;
      }

      // Respondendo com o PDF diretamente
      response.header('Content-Type', 'application/pdf');
      response.send(pdfData);

    } catch (error) {
      console.error('Error fetching PDF from database:', error);
      response.status(500).send('Internal Server Error');
    }
  }
}

export { PdfDownloadController };

