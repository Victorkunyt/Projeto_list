import pdfkit from 'pdfkit';
import { UserNames } from '../../types/PdfGenerator_types';
import { userIdOnlyName } from '../../validators/PdfGenerator/PdfGenerator_Validator';
import { PrismaClient } from "@prisma/client";
import { ExistsError } from '../../error/ExistsError';

class GeneratePdfService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async execute(nameUser: UserNames): Promise<void> {
    userIdOnlyName(nameUser);

    const categories = await this.prisma.category.findMany({
      where: {
        userId: nameUser.userId,
      },
      include: {
        tasks: true,
      },
    });

    if (!categories || categories.length === 0) {
      throw new ExistsError(`Não foram encontradas categorias para o UserId fornecido.`);
    }

    const pdfDoc = new pdfkit();
    const buffers: any[] = [];

    pdfDoc.on('data', buffers.push.bind(buffers));
    pdfDoc.on('end', async () => {
      const pdfData = Buffer.concat(buffers);

      // Salva o PDF no MongoDB
      await this.prisma.pdfStorage.create({
        data: {
          userId: nameUser.userId,
          pdfBlob: pdfData,
        },
      });
    });

    // Configuração do conteúdo do PDF
    pdfDoc.fontSize(16).text('Relatório de Tarefas', { align: 'center' });

    // Exemplo de conteúdo
    categories.forEach((category, index) => {
      pdfDoc.text(`Categoria ${index + 1}: ${category.nameCategory}`);
      category.tasks.forEach(task => {
        pdfDoc.text(`- ${task.nametask}`);
      });
      pdfDoc.moveDown();
    });

    pdfDoc.end();
  }
}

export { GeneratePdfService };
