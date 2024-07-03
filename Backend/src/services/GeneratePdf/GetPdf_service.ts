import { userIdOnlyName } from "../../validators/PdfGenerator/PdfGenerator_Validator";
import { PrismaClient } from "@prisma/client";
import { UserNames } from "../../types/PdfGenerator_types";
import { ExistsError } from "../../error/ExistsError";

class GetPdf {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async execute(userData: UserNames) {
    userIdOnlyName(userData);

    const pdfRecord = await this.prisma.pdfStorage.findFirst({
      where: { userId: userData.userId },
      orderBy: {
        createdAt: "desc", // Para garantir que estamos obtendo o PDF mais recente
      },
    });

    if (!pdfRecord) {
      throw new ExistsError("PDF not found");
    }

    return Buffer.from(pdfRecord.pdfBlob); // Convertendo para Buffer
  }
}

export { GetPdf };
