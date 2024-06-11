import {GetPdf} from "../../services/GeneratePdf/GetPdf_service"
import { FastifyRequest, FastifyReply } from "fastify";
import { UserNames } from '../../types/PdfGenerator_types';
import { PrismaClient } from "@prisma/client";



class GetPdfController {

    private prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
      this.prisma = prisma;
    }

    async handle(request: FastifyRequest, response: FastifyReply): Promise<void>  {

        const userData = request.query as UserNames;
        const PdfService = new GetPdf(this.prisma);

        
        const PdfGeneration = await PdfService.execute(userData);

        console.log(PdfGeneration);

        response.header('Content-Type', 'application/pdf');
        response.header('Content-Disposition', `attachment; filename=${userData.userId}_report.pdf`);
        response.send(PdfGeneration)
    }

}

export {GetPdfController}