import { PrismaClient } from "@prisma/client";
import { PayloadCategory } from "../../types/Category_types";
import { CategoryCampos } from "../../validators/Category/CreateCategory_Validator";

// Instância única do Prisma Client
const prisma = new PrismaClient();

class CategoryService {
    async execute(userData: PayloadCategory) {
        // Verifica os campos da categoria
        CategoryCampos(userData);

        // Cria a categoria utilizando a instância do Prisma Client
        const category = await prisma.category.create({
            data: {
                nameCategory: userData.nameCategory,
                status: true,
            }
        });

        return category;
    }
}

export { CategoryService };
