import { PrismaClient } from "@prisma/client";
import { sendEmailLines } from "../../types/SendEmail_types";
import { emailSendValidator } from "../../validators/SendEmail/Sendemail_validator";


class SendEmailService {

    private prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
      this.prisma = prisma;
    }
    
    async execute(userData: sendEmailLines) {
        if (!userData.service || !userData.user || !userData.pass || !userData.from || !userData.to || !userData.subject) {
            throw new Error('Todos os campos são obrigatórios passar informações');
        }

        emailSendValidator(userData)

        const ValidationEmail = await this.prisma.user.findMany({
            where: {
                email: userData.to
            }
        })

        if (ValidationEmail.length === 0) {
         throw new Error('Email não encontrado no banco de dados')
        }

        const nodemailer = require('nodemailer') as any;
        
        try {
            const transport = nodemailer.createTransport({
                service: userData.service,
                auth: {
                    user: userData.user,
                    pass: userData.pass
                }
            });

            if (!transport) {
                throw new Error('Erro ao criar o transporte de e-mail');
            }

             await transport.sendMail({
                from: userData.from,
                to: userData.to,
                subject: userData.subject,
                text: userData.text,

            });

        } catch (err) {
            throw new Error('Erro ao enviar o email:');
        }
    }
}

export { SendEmailService };