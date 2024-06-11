import { userIdOnlyName } from "../../validators/PdfGenerator/PdfGenerator_Validator";
import { PrismaClient } from "@prisma/client";
import { UserNames } from "../../types/PdfGenerator_types";

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
      throw new Error("PDF not found");
    }

    return Buffer.from(pdfRecord.pdfBlob);  // Certifique-se de que está retornando um Buffer
  }
}

export { GetPdf };
