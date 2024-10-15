import { PrismaClient } from "@prisma/client";
import { ExistsError } from "../../error/ExistsError";
import { Iduser } from "../../types/Task_types";
import { IdUsuario } from "../../validators/Task/TaskIdValidator";
import { ExistsMensage } from "../../error/ExistsMensage";

class DeleteUsersService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async execute(userData: Iduser) {
    // Valida o ID do usuário
    IdUsuario(userData);

    const idExistUser = await this.prisma.user.findFirst({
      where: {
        id: userData.id
      }
    })

    if (!idExistUser) {
      throw new ExistsError("ID do usuário não existe no banco de dados");

    }

    const UserAdminOn = await this.prisma.user.findFirst({
      where: {
        id: userData.userAdminID 
      }
    });
    
    if (UserAdminOn && !UserAdminOn.adminUser) {
      throw new ExistsMensage('Usuário não tem acesso para exluir, somente administradores');
    }

    const UserxUxers = await this.prisma.user.findFirst({
      where: {
        id: userData.id 
      }
    });
    
    if (UserxUxers?.id === UserAdminOn?.id) {
      throw new ExistsMensage('Usuário não tem como excluir ele mesmo');
    }

    // Exclua todas as categorias associadas ao usuário
    await this.prisma.category.deleteMany({
      where: {
        userId: userData.id,
      },
    });

    // Exclua todos os tokens de atualização associados ao usuário
    await this.prisma.refreshToken.deleteMany({
      where: {
        id: userData.id,
      },
    });

    // Exclua todas as notificações associadas ao usuário
    await this.prisma.notification.deleteMany({
      where: {
        recipientId: userData.id,
      },
    });

    // Exclua todas as Fotos associadas ao usuário
    await this.prisma.imageStorage.deleteMany({
      where: {
        id: userData.id,
      },
    });

    // Exclua o usuário
     await this.prisma.user.delete({
      where: {
        id: userData.id,
      },
    });

  }
}

export { DeleteUsersService };
