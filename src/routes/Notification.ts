import { FastifyRequest,FastifyInstance,FastifyPluginOptions,FastifyReply} from "fastify"
import { GetNotificaionController } from "../controllers/Notification/Notification_controller";
import { AuthMiddleware } from "../middleware/auth";


export async function routesNotification(fastify: FastifyInstance, options: FastifyPluginOptions) {


    fastify.get("/getnotification", async(request: FastifyRequest,reply: FastifyReply) => {
      //await AuthMiddleware(request,reply)
      return new GetNotificaionController().handle(request,reply)
    }
    )

}