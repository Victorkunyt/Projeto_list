import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcryptjs';
import { payloadNewPassword } from "../../types/NewPassword_types";
import { userIdNewPassword } from "../../types/NewPassword_types";
import { NewPasswordLines } from "../../validators/Pass/NewpasswordValidator";
import { NewPasswordId } from "../../validators/Pass/NewpasswordValidator";
import { ExistsError } from "../../error/ExistsError";

class NewPasswordService {

  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }
  async execute(userData: payloadNewPassword, Id: userIdNewPassword) {
    NewPasswordId(Id)
    

  const existingUser = await this.prisma.user.findUnique({
    where: {
      id: Id.userId
      
    }
  })
  if (!existingUser) {
    throw new ExistsError(`Usuário não encontrado`);
  }

  NewPasswordLines(userData)
  

  const hashedPassword = await bcrypt.hash(userData.repeatNewpassword, 10);


  const Updatepassword = await this.prisma.user.update({
    where: {
       id: Id.userId
    }, 
     data: {
      password: hashedPassword,
      status: true
     }
  })

    return Updatepassword;
  }
}

export { NewPasswordService };
