import { FastifyRequest,FastifyInstance,FastifyPluginOptions,FastifyReply} from "fastify"
import { ToSharedController } from "../controllers/ToShared/Shared_controller";
import { AuthMiddleware } from "../middleware/auth";


export async function routesShared(fastify: FastifyInstance, options: FastifyPluginOptions) {

  fastify.register(async function(fastify) {
    fastify.addHook("preHandler", AuthMiddleware);

    fastify.post("/ToShared", async(request: FastifyRequest,reply: FastifyReply) => {
      return new ToSharedController().handle(request,reply)
    }
    )
  })

}