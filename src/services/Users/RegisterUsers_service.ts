import { PrismaClient } from "@prisma/client";
import { UserTypes} from "../../types/Users_types";
import { LineObrigatórios,emailValidator,CellphoneValidator,HolderidphoneValidator,GenderValidator,PasswordValidator} from "../../validators/Login/RegisterUsers";
import { registerNotification } from "../../functions/SendNotification";


class UsersService {

    async execute(userData: UserTypes) {
        const prisma = new PrismaClient();
        
        LineObrigatórios(userData)
        emailValidator(userData)
        CellphoneValidator(userData)
        HolderidphoneValidator(userData)
        GenderValidator(userData)
        PasswordValidator(userData)




        const newUsers = await prisma.user.create({
            data: {
                name: userData.name,
                holderid: userData.holderid,
                status: true,
                cellphone: userData.cellphone,
                email: userData.email,
                gender: userData.gender,
                password: userData.password
            }
            
        });

        const GetUsers = await prisma.user.findFirst({
            where: userData.userId
        });

        await registerNotification("Sua Conta foi registrada com Sucesso", GetUsers?.id);


        return newUsers
    }
}

export { UsersService };
