import { FastifyRequest,FastifyInstance,FastifyPluginOptions,FastifyReply} from "fastify"
import { ToSharedController } from "../controllers/ToShared/Shared_controller";
import { AuthMiddleware } from "../middleware/auth";
import { PrismaClient } from "@prisma/client";



export async function routesShared(fastify: FastifyInstance, options: FastifyPluginOptions) {

  fastify.register(async function(fastify) {
    fastify.addHook("preHandler", AuthMiddleware);

    const prisma = new PrismaClient()

    fastify.post("/ToShared", async(request: FastifyRequest,reply: FastifyReply) => {
      return new ToSharedController(prisma).handle(request,reply)
    }
    )
  })

}