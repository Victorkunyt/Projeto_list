import pdfkit from 'pdfkit';
import { UserNames } from '../../types/PdfGenerator_types';
import { userIdOnlyName } from '../../validators/PdfGenerator/PdfGenerator_Validator';
import { PrismaClient } from "@prisma/client";
import fs from 'fs';
import path from 'path';

class GeneratePdfService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async execute(nameUser: UserNames) {
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
    const buffers: any[] = [];
    const pdfDirectory = path.resolve(__dirname, '../../pdfs');
    const pdfPath = path.join(pdfDirectory, `${nameUser.userId}.pdf`);

    // Criar diretório se não existir
    if (!fs.existsSync(pdfDirectory)) {
      fs.mkdirSync(pdfDirectory, { recursive: true });
    }

    pdfDoc.pipe(fs.createWriteStream(pdfPath));

    pdfDoc.on('data', buffers.push.bind(buffers));
    pdfDoc.on('end', async () => {
      const pdfData = Buffer.concat(buffers);
      console.log('PDF data length:', pdfData.length); // Adicione esta linha para depuração

      try {
        await this.prisma.pdfStorage.create({
          data: {
            userId: nameUser.userId,
            pdfBlob: pdfData
          }
        });
        console.log('PDF stored in database'); // Adicione esta linha para depuração
      } catch (error) {
        console.error('Error storing PDF in database:', error); // Adicione esta linha para depuração
      }
    });

    // Definindo cores
    const colors = ['#000000'];
    let colorIndex = 2;

    // Adicionar cabeçalho
    pdfDoc.fontSize(16).text('Relatório de Tarefas', { align: 'center' });

    // Definindo o layout em colunas
    const numColumns = 2; // Número de colunas
    const columnWidth = pdfDoc.page.width / numColumns;
    const lineHeight = 20;
    const categoryMargin = 10; // Espaço entre categorias

    // Definindo o fundo 
    pdfDoc.rect(2, 2, pdfDoc.page.width, pdfDoc.page.height).fill('#6495ED');
    // Adicionar ID do usuário no rodapé
    pdfDoc.moveDown().fontSize(10).fillColor('#666666').text(`Gerado pelo userId: ${nameUser.userId}`, { align: 'center' });
    pdfDoc.moveDown().fontSize(10).fillColor('#666666').text('Data de Geração: ' + new Date().toLocaleDateString(), { align: 'center' });

    // Percorrendo as categorias
    categories.forEach((category, index) => {
      // Calculando a posição X com base na coluna atual
      const currentX = index % numColumns * columnWidth + 50;
      const currentY = 50 + Math.floor(index / numColumns) * (pdfDoc.page.height / 2); // Posição inicial Y

      // Escrevendo o nome da categoria com cor
      pdfDoc.fillColor(colors[colorIndex % colors.length]).fontSize(20).text(`${category.nameCategory}`, currentX, currentY, { underline: false });

      // Calculando a posição Y para as tarefas
      let taskY = currentY + lineHeight + categoryMargin;

      // Escrevendo as tarefas da categoria
      category.tasks.forEach(task => {
        // Escrevendo a tarefa com cor
        pdfDoc.fillColor(colors[colorIndex % colors.length]).fontSize(14).text(`Tarefa: ${task.nametask}`, currentX, taskY);

        // Incrementando a posição Y
        taskY += lineHeight;
      });
    });

    pdfDoc.end();

    return pdfPath;
  }
}

export { GeneratePdfService };
