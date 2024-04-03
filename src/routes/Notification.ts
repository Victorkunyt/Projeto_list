import { FastifyRequest,FastifyInstance,FastifyPluginOptions,FastifyReply} from "fastify"
import { GetNotificaionController } from "../controllers/Notification/Notification_controller";
import { AuthMiddleware } from "../middleware/auth";
import { PrismaClient } from "@prisma/client";



export async function routesNotification(fastify: FastifyInstance, options: FastifyPluginOptions) {
  fastify.register(async function(fastify) {
    fastify.addHook("preHandler", AuthMiddleware);

    const prisma = new PrismaClient();

    fastify.get("/getnotification", async(request: FastifyRequest,reply: FastifyReply) => {
      return new GetNotificaionController(prisma).handle(request,reply)
    }
    )
  })
}