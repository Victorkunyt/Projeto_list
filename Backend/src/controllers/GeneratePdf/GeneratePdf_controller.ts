import { FastifyRequest, FastifyReply } from "fastify";
import { GeneratePdfService } from "../../services/GeneratePdf/GeneratePdf_service";
import { UserNames } from '../../types/PdfGenerator_types';
import { PrismaClient } from "@prisma/client";

class GeneratePDFController {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async handle(request: FastifyRequest, response: FastifyReply): Promise<void>  {

      const userData = request.body as UserNames;
      const categoryService = new GeneratePdfService(this.prisma);
      const pdfPath = await categoryService.execute(userData);

  const Jsonreturn = {
    message: "PDF Gerado com sucesso",
    PdfGeneration: pdfPath
  }
      response.send(Jsonreturn)
  }
}

export { GeneratePDFController };
