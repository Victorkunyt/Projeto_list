import { FastifyRequest,FastifyInstance,FastifyPluginOptions,FastifyReply} from "fastify"
import { SendEmailController } from "../controllers/SendEmail/Send_controller";
import { AuthMiddleware } from "../middleware/auth";
import { PrismaClient } from "@prisma/client";



export async function routesSendEmail(fastify: FastifyInstance, options: FastifyPluginOptions) {

//   fastify.register(async function(fastify) {
//     fastify.addHook("preHandler", AuthMiddleware);

const prisma = new PrismaClient()
    fastify.post("/sendEmail", async(request: FastifyRequest,reply: FastifyReply) => {
      return new SendEmailController(prisma).handle(request,reply)
    })

 // })

}