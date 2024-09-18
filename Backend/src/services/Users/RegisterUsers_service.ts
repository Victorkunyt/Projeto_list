import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcryptjs';
import { UserTypes } from "../../types/Users_types";
import {
  LineObrigatórios,
  emailValidator,
  CellphoneValidator,
  HolderidphoneValidator,
  GenderValidator,
  PasswordValidator,
} from "../../validators/Login/RegisterUsers";
import { ExistsError } from "../../error/ExistsError";
import { registerNotification } from "../../functions/SendNotification";

class UsersService {

  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }
  async execute(userData: UserTypes) {

    LineObrigatórios(userData);
    emailValidator(userData);
    CellphoneValidator(userData);
    HolderidphoneValidator(userData);
    GenderValidator(userData);
    PasswordValidator(userData);

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const VerificationEmail = await this.prisma.user.findFirst({
      where: {
        email: userData.email,
      },
    });

    if (VerificationEmail) {
      throw new ExistsError(
        "Email ,já esta registrado na base, por favor verifique seus dados"
      );
    }

    const VerificationCellPhone = await this.prisma.user.findFirst({
        where: {
          cellphone: userData.cellphone,
        },
      });
  
      if (VerificationCellPhone) {
        throw new ExistsError(
          "CellPhone ,já esta registrado na base, por favor verifique seus dados"
        );
      }

    const VerificationHolderid = await this.prisma.user.findFirst({
        where: {
          holderid: userData.holderid,
        },
      });
  
      if (VerificationHolderid) {
        throw new ExistsError(
          "holderId ,já esta registrado na base, por favor verifique seus dados"
        );
      }



    const newUsers = await this.prisma.user.create({
      data: {
        name: userData.name,
        holderid: userData.holderid,
        status: true,
        cellphone: userData.cellphone,
        email: userData.email,
        gender: userData.gender,
        password: hashedPassword,
      },
    });

    if (newUsers.id) {
      await registerNotification(this.prisma, "Sua Conta foi registrada com Sucesso", newUsers.id);
    }
    

    return newUsers;
  }
}

export { UsersService };
