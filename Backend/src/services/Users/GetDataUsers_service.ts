import { PrismaClient } from "@prisma/client";
import { UserTypes } from "../../types/Users_types";
import { ExistsError } from '../../error/ExistsError';
import { IdUser } from "../../validators/User/UsersValidator";

class GetDataUsersService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async execute(userData: UserTypes) {
    // Verificação dos parâmetros
    if (!userData.userId && !userData.holderid) {
      throw new ExistsError('Pelo menos um dos parâmetros (userId ou holderid) deve ser fornecido');
    }

    IdUser(userData);

    let GetDataUsers = null;
    if (userData.userId || userData.holderid) {
      GetDataUsers = await this.prisma.user.findMany({
        where: {
          id: userData.userId,
          holderid: userData.holderid
        },
      });

      if (!GetDataUsers.length) {
        throw new ExistsError('userId ou holderid inválido');
      }
    }

    return GetDataUsers
  }
}

export { GetDataUsersService };
