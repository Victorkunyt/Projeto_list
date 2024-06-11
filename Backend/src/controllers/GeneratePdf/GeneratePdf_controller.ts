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
      const pdfPath = await PdfService.execute(userData);
      const downloadLink = `${request.protocol}://${request.hostname}/pdfs/${userData.userId}.pdf`;
      response.send({ message: 'PDF generated successfully', downloadLink });
    } catch (error) {
      console.error('Error generating PDF:', error);
      response.status(500).send('Internal Server Error');
    }
  }
}

export { GeneratePDFController };


// id Int @id @default(autoincrement()) 
// id String @id @default(uuid())