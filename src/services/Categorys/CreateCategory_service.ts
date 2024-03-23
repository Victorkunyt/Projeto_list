import { PrismaClient } from "@prisma/client";
import { PayloadCategory } from "../../types/Category_types";
import { CategoryCampos } from "../../validators/Category/CreateCategory_Validator";

class CategoryService {

    async execute(userData: PayloadCategory) {
        const prisma = new PrismaClient();

        CategoryCampos(userData)
        const CategoryUsers = await prisma.category.create({
            data: {
               nameCategory: userData.nameCategory,
               status: true,
            }
            
        });

        return CategoryUsers
    }
}

export { CategoryService };
