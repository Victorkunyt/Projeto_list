import { FastifyRequest,FastifyInstance,FastifyPluginOptions,FastifyReply} from "fastify"
import { AuthMiddleware } from "../middleware/auth";
import { PrismaClient } from "@prisma/client";
import { UploadImageController } from "../controllers/UpImage/UploadImageController";



export async function routesImage(fastify: FastifyInstance, options: FastifyPluginOptions) {
//   fastify.register(async function(fastify) {
//     fastify.addHook("preHandler", AuthMiddleware);

//     )


const prisma = new PrismaClient();

fastify.post("/upload-image", async(request: FastifyRequest,reply: FastifyReply) => {
  return new UploadImageController(prisma).handle(request,reply)
}


)
}
