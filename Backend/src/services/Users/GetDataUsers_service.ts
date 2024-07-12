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
    IdUser(userData)

    const GetDataUsers = await this.prisma.user.findMany({
        where: {
            id: userData.userId
        }
    });

    if (!GetDataUsers) {
      throw new ExistsError('userId inválido')
    }

    return GetDataUsers;
  }
}

export { GetDataUsersService };
