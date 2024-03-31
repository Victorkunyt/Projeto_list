import { PrismaClient } from "@prisma/client";
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

class UsersService {
  async execute(userData: UserTypes) {
    const prisma = new PrismaClient();

    LineObrigatórios(userData);
    emailValidator(userData);
    CellphoneValidator(userData);
    HolderidphoneValidator(userData);
    GenderValidator(userData);
    PasswordValidator(userData);

    const VerificationEmail = await prisma.user.findFirst({
      where: {
        email: userData.email,
      },
    });

    if (VerificationEmail) {
      throw new Error(
        "Email ,já esta registrado na base, por favor verifique seus dados"
      );
    }

    const VerificationCellPhone = await prisma.user.findFirst({
        where: {
          cellphone: userData.cellphone,
        },
      });
  
      if (VerificationCellPhone) {
        throw new Error(
          "CellPhone ,já esta registrado na base, por favor verifique seus dados"
        );
      }

    const VerificationHolderid = await prisma.user.findFirst({
        where: {
          holderid: userData.holderid,
        },
      });
  
      if (VerificationHolderid) {
        throw new Error(
          "holderId ,já esta registrado na base, por favor verifique seus dados"
        );
      }



    const newUsers = await prisma.user.create({
      data: {
        name: userData.name,
        holderid: userData.holderid,
        status: true,
        cellphone: userData.cellphone,
        email: userData.email,
        gender: userData.gender,
        password: userData.password,
      },
    });

    const GetUsers = await prisma.user.findFirst({
      where: userData.userId,
    });

    await registerNotification(
      "Sua Conta foi registrada com Sucesso",
      GetUsers?.id
    );

    return newUsers;
  }
}

export { UsersService };
