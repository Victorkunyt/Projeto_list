import { FastifyRequest, FastifyReply } from "fastify";
import { NewPasswordService } from "../../services/Pass/Newpassword";
import { userIdNewPassword } from "../../types/NewPassword_types";
import { payloadNewPassword } from "../../types/NewPassword_types";
import { PrismaClient } from "@prisma/client";

class NewPasswordController {

    private prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
      this.prisma = prisma;
    }

    async handle(request: FastifyRequest, response: FastifyReply): Promise<void> {

            const userData = request.body as payloadNewPassword; 
            const userId = request.query as userIdNewPassword;
            const PutNewpassword = new NewPasswordService(this.prisma);
            await PutNewpassword.execute(userData,userId);

            response.send({message: `Senha atualizada com sucesso`})
}
    }


export { NewPasswordController };
