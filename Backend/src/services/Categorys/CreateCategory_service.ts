import { PrismaClient } from "@prisma/client";
import { PayloadCategory } from "../../types/Category_types";
import { CategoryCampos } from "../../validators/Category/CreateCategory_Validator";
import { registerNotification } from "../../functions/SendNotification";

const prisma = new PrismaClient();

class CategoryService {

    private prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
      this.prisma = prisma;
    }

    async execute(userData: PayloadCategory) {
        CategoryCampos(userData);

        // Verifica se o usuário com o ID fornecido existe
        const iduserServer = await this.prisma.user.findFirst({
            where: {
                id: userData.userId
            }
        });

        if (!iduserServer) {
            throw new Error('Usuário não encontrado, Por favor registre um usuario');
        }



        // Cria a categoria
        const category = await this.prisma.category.create({
            data: {
                nameCategory: userData.nameCategory,
                userId: userData.userId,
                status: true,
                
            }
        });

                // Chama a função de registro de notificação
                await registerNotification(prisma,"Sua Categoria foi registrada com Sucesso", userData.userId);
        return category;
    }
}

export { CategoryService };
