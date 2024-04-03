import { FastifyRequest,FastifyInstance,FastifyPluginOptions,FastifyReply} from "fastify"
import { TaskCreateController } from "../controllers/Tasks/CreateTask_controller"
import { TaskGetAllController } from "../controllers/Tasks/GetAllTask_controller"
import { TaskUpdateController } from "../controllers/Tasks/PutTaskController"
import { TaskDeleteController } from "../controllers/Tasks/DeleteTask_controller"
import { AuthMiddleware } from "../middleware/auth";
import { PrismaClient } from "@prisma/client";



export async function routesTask(fastify: FastifyInstance, options: FastifyPluginOptions) {
  fastify.register(async function(fastify) {
    fastify.addHook("preHandler", AuthMiddleware);

    const prisma = new PrismaClient()

    fastify.post("/registerTask", async(request: FastifyRequest,reply: FastifyReply) => {
      return new TaskCreateController(prisma).handle(request,reply)
    }
    )

    fastify.get("/getAlltask", async(request: FastifyRequest,reply: FastifyReply) => {
      return new TaskGetAllController(prisma).handle(request,reply)
    }
    )

    fastify.put("/putTask", async(request: FastifyRequest,reply: FastifyReply) => {
      return new TaskUpdateController(prisma).handle(request,reply)
    }
    )

    fastify.delete("/deleteTask", async(request: FastifyRequest,reply: FastifyReply) => {
      return new TaskDeleteController(prisma).handle(request,reply)
    }
    )
  })
  }
