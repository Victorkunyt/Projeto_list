import { PrismaClient } from "@prisma/client";
import { Iduser } from "../../types/Task_types";
import { Idvalidação } from "../../validators/Category/CreateCategory_Validator";

class DeleteCategoryService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async execute(userData: Iduser) {
    Idvalidação(userData);

    const findId = await this.prisma.category.findUnique({
      where: {
        id: userData.id,
      },
    });

    if (!findId) {
      throw new Error("Id da Categoria não existe na base de dados");
    }

    // Encontre todas as tarefas associadas a esta categoria
    const tasks = await this.prisma.task.findMany({
      where: {
        categoryId: userData.id,
      },
    });

    // Exclua todas as tarefas associadas
    await Promise.all(
      tasks.map(async (task) => {
        await this.prisma.task.delete({
          where: {
            id: task.id,
          },
        });
      })
    );

    // Agora que todas as tarefas foram excluídas, exclua a categoria
    const deletedCategory = await this.prisma.category.delete({
      where: {
        id: userData.id,
      },
    });

    return deletedCategory;
  }
}

export { DeleteCategoryService };
