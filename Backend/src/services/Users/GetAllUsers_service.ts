import { PrismaClient } from "@prisma/client";
import { UserTypes } from "../../types/Users_types";
import { ExistsMensage } from "../../error/ExistsMensage";
import { Idonly } from "../../validators/User/UsersValidator";



class GetUsersAllService {

  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }
  async execute(userData: UserTypes) {
    Idonly(userData)

    const UserAdminOn = await this.prisma.user.findFirst({
      where: {
        id: userData.userId 
      }
    });
    
    if (UserAdminOn && !UserAdminOn.adminUser) {
      throw new ExistsMensage('Usuário não tem acesso, somente administradores');
    }

    const GetUsers = await this.prisma.user.findMany({});

    if (GetUsers.length === 0) {
      return { message: "Nenhum usuario encontrado" };
    }

    return GetUsers;
  }
}

export { GetUsersAllService };
