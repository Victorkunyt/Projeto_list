import {FastifyInstance,FastifyPluginOptions,FastifyRequest,FastifyReply} from "fastify";
import { UsersCreateController } from "../controllers/Users/RegisterUsers_controller";
import { GetUsersAllController } from "../controllers/Users/GetAllUsers_controller";
import { DeleteUsersAllController } from "../controllers/Users/DeleteAllUser_controller";
import { LoginUserController } from "../controllers/Users/LoginUsers_controller";
import { AuthMiddleware } from "../middleware/auth";


export async function routesUsers(fastify: FastifyInstance, options: FastifyPluginOptions) {

  fastify.get("/", async (request: FastifyRequest, reply: FastifyReply) => {
    reply.send({ message: "Active API Vercel!" });
  });
  
  fastify.post("/register", async(request: FastifyRequest,reply: FastifyReply) => {
    return new UsersCreateController().handle(request,reply)
  })

  fastify.get("/getUsersAll", { preHandler: AuthMiddleware }, async(request: FastifyRequest,reply: FastifyReply) => {
    return new GetUsersAllController().handle(request,reply)
 })

  fastify.delete("/deleteUsers", { preHandler: AuthMiddleware }, async(request: FastifyRequest,reply: FastifyReply) => {
    return new DeleteUsersAllController().handle(request,reply)
})

fastify.post("/login", async(request: FastifyRequest,reply: FastifyReply) => {
  return new LoginUserController().handle(request,reply)
})
}