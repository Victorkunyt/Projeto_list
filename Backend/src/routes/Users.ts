import {FastifyInstance,FastifyPluginOptions,FastifyRequest,FastifyReply} from "fastify";
import { UsersCreateController } from "../controllers/Users/RegisterUsers_controller";
import { GetUsersAllController } from "../controllers/Users/GetAllUsers_controller";
import { DeleteUsersAllController } from "../controllers/Users/DeleteAllUser_controller";
import { LoginUserController } from "../controllers/Users/LoginUsers_controller";
import { GetDataUsersController } from "../controllers/Users/GetDataUsers_controller";
import { AuthMiddleware } from "../middleware/auth";
import { PrismaClient } from "@prisma/client";



export async function routesUsers(fastify: FastifyInstance, options: FastifyPluginOptions) {

  fastify.get("/", async (request: FastifyRequest, reply: FastifyReply) => {
    reply.send({ message: "Active API" });
  });

  const prisma = new PrismaClient();

  
  fastify.post("/register", async(request: FastifyRequest,reply: FastifyReply) => {
    return new UsersCreateController(prisma).handle(request,reply)
  })

  fastify.post("/login", async(request: FastifyRequest,reply: FastifyReply) => {
    return new LoginUserController(prisma).handle(request,reply)
  })

  fastify.register(async function(fastify) {
    fastify.addHook("preHandler", AuthMiddleware);

  fastify.get("/getUsersAll", async(request: FastifyRequest,reply: FastifyReply) => {
    return new GetUsersAllController(prisma).handle(request,reply)
 })

 fastify.get("/getDataUsers", async(request: FastifyRequest,reply: FastifyReply) => {
  return new GetDataUsersController(prisma).handle(request,reply)
})

  fastify.delete("/deleteUsers", async(request: FastifyRequest,reply: FastifyReply) => {
    return new DeleteUsersAllController(prisma).handle(request,reply)
})


  })
}