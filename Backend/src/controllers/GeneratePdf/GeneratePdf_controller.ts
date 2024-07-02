import { FastifyRequest, FastifyReply } from "fastify";
import { GeneratePdfService } from "../../services/GeneratePdf/GeneratePdf_service";
import { UserNames } from '../../types/PdfGenerator_types';
import { PrismaClient } from "@prisma/client";

class GeneratePDFController {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async handle(request: FastifyRequest, response: FastifyReply): Promise<void> {
    const userData = request.body as UserNames;
    const PdfService = new GeneratePdfService(this.prisma);

    try {
       await PdfService.execute(userData);
      response.send({ message: 'PDF generated successfully' });
    } catch (error) {
      console.error('Error generating PDF:', error);
      response.status(500).send('Internal Server Error');
    }
  }
}

export { GeneratePDFController };
