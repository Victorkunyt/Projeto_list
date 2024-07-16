import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcryptjs';
import { GeneratorTokenProvider } from "../../middleware/generate";
import { GenerateRefreshToken } from "../../middleware/refresh";
import { LogType } from "../../types/Login_types";
import { LoginCampos } from "../../validators/Login/LoginValidador";
import { ExistsError } from "../../error/ExistsError";

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
            throw new ExistsError('Usuário não encontrado');
        }

        // Compara a senha fornecida com a senha criptografada no banco de dados
        const passwordMatch = await bcrypt.compare(userData.password, user.password);

        if (!passwordMatch) {
            throw new ExistsError("Senha incorreta. Verifique suas credenciais.");
        }

        const gerneratorTokenProvider = new GeneratorTokenProvider()
        const token = await gerneratorTokenProvider.execute(userData)

        const generateRefreshToken = new GenerateRefreshToken(this.prisma);
        const refreshToken = await generateRefreshToken.execute(user.id);

        return { token, refreshToken }
    }
}

export { LoginService };
