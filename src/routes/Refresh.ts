import { FastifyRequest,FastifyInstance,FastifyPluginOptions,FastifyReply} from "fastify"
import { Refresh_tokenController } from "../controllers/RefreshToken/RefreshToken_controller"


export async function routesRefreshToken(fastify: FastifyInstance, options: FastifyPluginOptions) {


    fastify.post("/refreshtoken", async(request: FastifyRequest,reply: FastifyReply) => {
      return new Refresh_tokenController().handle(request,reply)
    }
    )
}