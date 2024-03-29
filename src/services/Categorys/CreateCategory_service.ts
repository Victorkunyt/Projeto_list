import { PrismaClient } from "@prisma/client";
import { PayloadCategory } from "../../types/Category_types";
import { CategoryCampos } from "../../validators/Category/CreateCategory_Validator";
import { registerNotification } from "../../functions/SendNotification";

const prisma = new PrismaClient();

class CategoryService {
    async execute(userData: PayloadCategory) {
        CategoryCampos(userData);

        // Verifica se o usuário com o ID fornecido existe
        const iduserServer = await prisma.user.findFirst({
            where: {
                id: userData.userId
            }
        });

        if (!iduserServer) {
            throw new Error('Usuário não encontrado, Por favor registre um usuario');
        }

        // Chama a função de registro de notificação
        await registerNotification("Sua Categoria foi registrada com Sucesso", userData.userId);

        // Cria a categoria
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
