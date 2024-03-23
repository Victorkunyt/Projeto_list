import { PrismaClient } from "@prisma/client";

class GetCategoryService {
  async execute() {
    const prisma = new PrismaClient();

    const searchCategory = await prisma.category.findMany({});

    if (searchCategory.length === 0) {
      return { message: "Nenhuma categoria encontrada" };
    }

    return searchCategory;

 
  }
}

export { GetCategoryService };
