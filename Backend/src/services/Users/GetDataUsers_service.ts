import { PrismaClient } from "@prisma/client";
import { UserTypes } from "../../types/Users_types";
import { ExistsError } from '../../error/ExistsError';
import { IdUser } from "../../validators/User/UsersValidator";

class GetDataUsersService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async execute(userData: UserTypes): Promise<UserTypes[]> {
    if (!userData.userId && !userData.holderid) {
      throw new ExistsError('Pelo menos um dos parâmetros (userId ou holderid) deve ser fornecido');
    }

    IdUser(userData);

    let rawUsers: {
      id: string;
      name: string;
      holderid: string;
      cellphone: string;
      email: string;
      gender: string;
      password: string;
      adminUser: boolean;
      status: boolean;
      created_at: Date | null;
      updated_at: Date | null;
    }[] = [];

    try {
      rawUsers = await this.prisma.user.findMany({
        where: {
          OR: [
            { id: userData.userId },
            { holderid: userData.holderid }
          ]
        }
      });
    } catch (error) {
      throw new Error('Erro ao acessar o banco de dados');
    }

    const GetDataUsers: UserTypes[] = rawUsers.map(user => ({
      name: user.name,
      holderid: user.holderid,
      cellphone: user.cellphone,
      email: user.email,
      gender: user.gender,
      password: user.password,
      adminUser: user.adminUser,
      userId: user.id // Adiciona o userId
    }));

    if (userData.userId && userData.holderid) {
      const matchedUsers = GetDataUsers.filter(user => user.userId === userData.userId && user.holderid === userData.holderid);
      if (!matchedUsers.length) {
        throw new ExistsError('userId e holderid não são do mesmo usuário');
      }
    } else if (!GetDataUsers.length) {
      throw new ExistsError('userId ou holderid inválido');
    }

    return GetDataUsers;
  }
}

export { GetDataUsersService };
