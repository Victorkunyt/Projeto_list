import { PrismaClient } from "@prisma/client";
import { sendEmailLines } from "../../types/SendEmail_types";
import { emailSendValidator } from "../../validators/SendEmail/Sendemail_validator";
import { ExistsError } from "../../error/ExistsError";


class SendEmailService {

    private prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
      this.prisma = prisma;
    }
    
    async execute(userData: sendEmailLines) {
        if (!userData.service || !userData.user || !userData.pass || !userData.from || !userData.to || !userData.subject) {
            throw new ExistsError('Todos os campos são obrigatórios passar informações');
        }

        emailSendValidator(userData)

        const ValidationEmails = await this.prisma.user.findMany({
            where: {
                email: {
                    contains: userData.to,
                    mode: "insensitive"
                }
            }
            
        })

        if (ValidationEmails.length === 0) {
         throw new ExistsError('Email não encontrado no banco de dados')
        }

        const user = ValidationEmails[0];

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
                throw new ExistsError('Erro ao criar o transporte de e-mail');
            }

             await transport.sendMail({
                from: userData.from,
                to: userData.to,
                subject: userData.subject,
                text: userData.text,

            });

            return user.id

        } catch (err) {
            throw new Error('Erro ao enviar o email:');
        }
    }
}

export { SendEmailService };