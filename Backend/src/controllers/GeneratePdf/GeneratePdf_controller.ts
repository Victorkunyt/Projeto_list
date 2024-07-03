import { FastifyRequest, FastifyReply } from "fastify";
import { GeneratePdfService } from "../../services/GeneratePdf/GeneratePdf_service";
import { UserNames } from '../../types/PdfGenerator_types';
import { PrismaClient } from "@prisma/client";
import { ExistsError } from "../../error/ExistsError";

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
      if (error instanceof ExistsError) {
        response.status(400).send({ error: error.message });
      } else {
        response.send(error)
      }
    }
  }
}

export { GeneratePDFController };
