import { FastifyRequest,FastifyInstance,FastifyPluginOptions,FastifyReply} from "fastify"
import { ToSharedController } from "../controllers/ToShared/Shared_controller";
import { AuthMiddleware } from "../middleware/auth";


export async function routesShared(fastify: FastifyInstance, options: FastifyPluginOptions) {


    fastify.post("/ToShared", async(request: FastifyRequest,reply: FastifyReply) => {
      await AuthMiddleware(request,reply)
      return new ToSharedController().handle(request,reply)
    }
    )


}