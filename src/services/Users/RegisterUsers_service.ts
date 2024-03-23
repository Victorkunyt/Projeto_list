import { PrismaClient } from "@prisma/client";
import { UserTypes} from "../../types/Users_types";
import { LineObrigatórios,emailValidator,CellphoneValidator,HolderidphoneValidator,GenderValidator,PasswordValidator} from "../../validators/Login/RegisterUsers";

class UsersService {

    async execute(userData: UserTypes) {
        const prisma = new PrismaClient();
        
        //Validações//

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

        return newUsers
    }
}

export { UsersService };
