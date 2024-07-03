
import pdfkit from 'pdfkit';
import fs from 'fs';
import path from 'path';
import { UserNames } from '../../types/PdfGenerator_types';
import { userIdOnlyName } from '../../validators/PdfGenerator/PdfGenerator_Validator';
import { PrismaClient } from "@prisma/client";
import { ExistsError } from '../../error/ExistsError';

class GeneratePdfService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async execute(nameUser: UserNames): Promise<string> {
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
      throw new Error(`Não foram encontradas categorias para o UserId fornecido.`);
    }

    const pdfDoc = new pdfkit();
    const pdfPath = path.join(__dirname, `../../pdfs/${nameUser.userId}.pdf`);
    const writeStream = fs.createWriteStream(pdfPath);

    pdfDoc.pipe(writeStream);

    // Configuração do conteúdo do PDF...
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

    // Salva o PDF no MongoDB
    const pdfData = await new Promise<Buffer>((resolve, reject) => {
      const buffers: any[] = [];
      pdfDoc.on('data', buffers.push.bind(buffers));
      pdfDoc.on('end', () => {
        resolve(Buffer.concat(buffers));
      });
    });

    await this.prisma.pdfStorage.create({
      data: {
        userId: nameUser.userId,
        pdfBlob: pdfData,
      },
    });



    return pdfPath;
  }
}

export { GeneratePdfService };

