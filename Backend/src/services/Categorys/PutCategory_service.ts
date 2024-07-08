import { PrismaClient } from "@prisma/client";
import { PayloadCategory,IdCategoria} from "../../types/Category_types";
import { ExistsError } from "../../error/ExistsError";
import { UpdateCategory } from "../../validators/Category/CreateCategory_Validator";

class PutCategory {

    private prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
      this.prisma = prisma;
    }

    async execute(userData: PayloadCategory, Id: IdCategoria) {

     UpdateCategory(userData,Id)
     const verificationId = await this.prisma.category.findMany({
        where: {
            id: Id.categoryId
        }
        
     })

     if (!verificationId || verificationId.length === 0) {
        throw new ExistsError('Id da categoria inválido')
     }

     const PutCategoryUsers = await this.prisma.category.update({
        where: {
          id: Id.categoryId,
        },
        data: {
          nameCategory: userData.nameCategory,
          status: true,
        },
      });
  
      return {PutCategoryUsers};

    }

}

export {PutCategory}