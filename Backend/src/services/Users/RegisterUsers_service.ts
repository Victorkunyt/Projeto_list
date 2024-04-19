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
import { registerNotification } from "../../functions/SendNotification";
import prismaClient from "../../prisma";

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
      throw new Error(
        "Email ,já esta registrado na base, por favor verifique seus dados"
      );
    }

    const VerificationCellPhone = await this.prisma.user.findFirst({
        where: {
          cellphone: userData.cellphone,
        },
      });
  
      if (VerificationCellPhone) {
        throw new Error(
          "CellPhone ,já esta registrado na base, por favor verifique seus dados"
        );
      }

    const VerificationHolderid = await this.prisma.user.findFirst({
        where: {
          holderid: userData.holderid,
        },
      });
  
      if (VerificationHolderid) {
        throw new Error(
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

    const GetUsers = await this.prisma.user.findFirst({
      where: userData.userId,
    });

    await registerNotification(prismaClient,"Sua Conta foi registrada com Sucesso",GetUsers?.id);

    return newUsers;
  }
}

export { UsersService };
