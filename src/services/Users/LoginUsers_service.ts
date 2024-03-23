import { PrismaClient } from "@prisma/client";
import { GeneratorTokenProvider } from "../../middleware/generate";
import { LogType } from "../../types/Login_types";
import { LoginCampos } from "../../validators/Login/LoginValidador";

class LoginService {

    async execute(userData: LogType) {
        const prisma = new PrismaClient();
        
        LoginCampos(userData)

    const TableUsers = await prisma.user.findMany({
        where: {
            email: userData.login,
            password: userData.password
        
        }     
    })

    if(TableUsers.length === 0) {
       throw new Error('Login e password não registrado no banco de dados ')
    }
    const gerneratorTokenProvider = new GeneratorTokenProvider()
    const token = await gerneratorTokenProvider.execute(userData)


    return token
    }

}

export { LoginService };
