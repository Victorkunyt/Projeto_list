import { FastifyRequest, FastifyReply } from "fastify";
import { SendEmailService } from '../../services/SendEmail/Send_service';
import { sendEmailLines } from "../../types/SendEmail_types";
import { PrismaClient } from "@prisma/client";

class SendEmailController {

    private prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
      this.prisma = prisma;
    }
    async handle(request: FastifyRequest, reply: FastifyReply): Promise<void>  {
        const userData =  request.body as sendEmailLines
        const sendService = new SendEmailService(this.prisma);
        const Id = await sendService.execute(userData);
        const ReplyEmail = {
          message: "Email enviado com sucesso",
          userId: Id
        }
        reply.send(ReplyEmail);
    }
}

export { SendEmailController };