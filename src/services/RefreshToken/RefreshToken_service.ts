import prismaClient from "../../prisma";
import { GeneratorTokenProvider } from "../../middleware/generate";
import {LogType} from "../../types/Login_types";
import { RefreshLine } from "../../validators/Login/LoginValidador";


class Refresh_token {

async execute(refresh_token: LogType) {

    RefreshLine(refresh_token)

const Tokenrefresh = await prismaClient.refreshToken.findFirst({

    where: {
       id: refresh_token.refresh_token
    }

})

if (!Tokenrefresh) {
    throw new Error('Id inválido')
}


const generateRefreshToken = new GeneratorTokenProvider()
const token = await generateRefreshToken.execute(refresh_token);


return {token}
}



}

export {Refresh_token}