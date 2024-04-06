import { FastifyRequest,FastifyInstance,FastifyPluginOptions,FastifyReply} from "fastify"
import { Refresh_tokenController } from "../controllers/RefreshToken/RefreshToken_controller"
import { PrismaClient } from "@prisma/client";



export async function routesRefreshToken(fastify: FastifyInstance, options: FastifyPluginOptions) {

  const prisma = new PrismaClient()

    fastify.post("/refreshtoken", async(request: FastifyRequest,reply: FastifyReply) => {
      return new Refresh_tokenController(prisma).handle(request,reply)
    }
    )
}