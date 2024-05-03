import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcryptjs';
import { payloadNewPassword } from "../../types/NewPassword_types";
import { userIdNewPassword } from "../../types/NewPassword_types";
import { NewPasswordLines } from "../../validators/Pass/NewpasswordValidator";
import { NewPasswordId } from "../../validators/Pass/NewpasswordValidator";

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
    throw new Error(`Usuário não encontrado`);
  }

  const passwordMatch = await bcrypt.compare(userData.password, existingUser.password);

  NewPasswordLines(userData)
  
  if (!passwordMatch) {
    throw new Error(`A senha informada não é a mesma que está registrada no banco de dados`);
  }


  const hashedPassword = await bcrypt.hash(userData.repeatNewpassword, 10);

  if (userData.password === userData.newpassword && userData.password === userData.repeatNewpassword) {
       throw new Error(`Não é possivel Atualizar a senha com a mesma senha anterior`)
  }


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
