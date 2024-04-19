import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcryptjs';
import { GeneratorTokenProvider } from "../../middleware/generate";
import { GenerateRefrashToken } from "../../middleware/refresh";
import { LogType } from "../../types/Login_types";
import { LoginCampos } from "../../validators/Login/LoginValidador";

class LoginService {

    private prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
      this.prisma = prisma;
    }

    async execute(userData: LogType) {
        
        LoginCampos(userData)

        const user = await this.prisma.user.findFirst({
            where: {
                email: userData.login,
            }     
        })

        if (!user) {
            throw new Error('Usuário não encontrado');
        }

        // Compara a senha fornecida com a senha criptografada no banco de dados
        const passwordMatch = await bcrypt.compare(userData.password, user.password);

        if (!passwordMatch) {
            throw new Error("Senha incorreta. Verifique suas credenciais.");
        }

        const gerneratorTokenProvider = new GeneratorTokenProvider()
        const token = await gerneratorTokenProvider.execute(userData)

        const generateRefreshToken = new GenerateRefrashToken();
        const refreshToken = await generateRefreshToken.execute(user.id);

        return { token, refreshToken }
    }
}

export { LoginService };
