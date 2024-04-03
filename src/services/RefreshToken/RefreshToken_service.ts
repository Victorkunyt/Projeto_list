import prismaClient from "../../prisma";
import { GeneratorTokenProvider } from "../../middleware/generate";
import {LogType} from "../../types/Login_types";
import { RefreshLine } from "../../validators/Login/LoginValidador";
import { PrismaClient } from "@prisma/client";


class Refresh_token {

    private prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
      this.prisma = prisma;
    }

async execute(refresh_token: LogType) {

    RefreshLine(refresh_token)

const Tokenrefresh = await this.prisma.refreshToken.findFirst({

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