import { FastifyRequest,FastifyInstance,FastifyPluginOptions,FastifyReply} from "fastify"
import { NewPasswordController } from "../controllers/Pass/Newpassword";
import { AuthMiddleware } from "../middleware/auth";
import { PrismaClient } from "@prisma/client";



export async function routesNewpassword(fastify: FastifyInstance, options: FastifyPluginOptions) {

  fastify.register(async function(fastify) {
    fastify.addHook("preHandler", AuthMiddleware);

    const prisma = new PrismaClient()

    fastify.put("/newPassword", async(request: FastifyRequest,reply: FastifyReply) => {
      return new NewPasswordController(prisma).handle(request,reply)
    })

  })

}