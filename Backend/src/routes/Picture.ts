import { FastifyRequest,FastifyInstance,FastifyPluginOptions,FastifyReply} from "fastify"
import { AuthMiddleware } from "../middleware/auth";
import { PrismaClient } from "@prisma/client";
import { UploadImageController } from "../controllers/Pictures/UploadImageController";
import { GetImageController } from "../controllers/Pictures/GetImageController";



export async function picturesImage(fastify: FastifyInstance, options: FastifyPluginOptions) {
//   fastify.register(async function(fastify) {
//     fastify.addHook("preHandler", AuthMiddleware);

//     )


const prisma = new PrismaClient();

fastify.post("/upload-image", async(request: FastifyRequest,reply: FastifyReply) => {
  return new UploadImageController(prisma).handle(request,reply)
})

fastify.get("/get-image", async(request: FastifyRequest,reply: FastifyReply) => {
  return new GetImageController(prisma).handle(request,reply)
})
}
