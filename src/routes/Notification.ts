import { FastifyRequest,FastifyInstance,FastifyPluginOptions,FastifyReply} from "fastify"
import { GetNotificaionController } from "../controllers/Notification/Notification_controller";
import { AuthMiddleware } from "../middleware/auth";


export async function routesNotification(fastify: FastifyInstance, options: FastifyPluginOptions) {
  fastify.register(async function(fastify) {
    fastify.addHook("preHandler", AuthMiddleware);

    fastify.get("/getnotification", async(request: FastifyRequest,reply: FastifyReply) => {
      return new GetNotificaionController().handle(request,reply)
    }
    )
  })
}