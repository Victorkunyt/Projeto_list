import {FastifyInstance,FastifyPluginOptions,FastifyRequest,FastifyReply} from "fastify";
import { UsersCreateController } from "../controllers/Users/CreateUsers_controller";


export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {


    fastify.post("/register", async(request: FastifyRequest,reply: FastifyReply) => {

     return new UsersCreateController().handle(request,reply)
  })

}