import { FastifyRequest,FastifyInstance,FastifyPluginOptions,FastifyReply} from "fastify"
import { TaskCreateController } from "../controllers/Tasks/CreateTask_controller"
import { TaskGetAllController } from "../controllers/Tasks/GetAllTask_controller"
import { TaskUpdateController } from "../controllers/Tasks/PutTaskController"
import { TaskDeleteController } from "../controllers/Tasks/DeleteTask_controller"
import { AuthMiddleware } from "../middleware/auth";


export async function routesTask(fastify: FastifyInstance, options: FastifyPluginOptions) {


    fastify.post("/registerTask", async(request: FastifyRequest,reply: FastifyReply) => {
      await AuthMiddleware(request,reply)
      return new TaskCreateController().handle(request,reply)
    }
    )

    fastify.get("/getAlltask", async(request: FastifyRequest,reply: FastifyReply) => {
      await AuthMiddleware(request,reply)
      return new TaskGetAllController().handle(request,reply)
    }
    )

    fastify.put("/putTask", async(request: FastifyRequest,reply: FastifyReply) => {
      await AuthMiddleware(request,reply)
      return new TaskUpdateController().handle(request,reply)
    }
    )

    fastify.delete("/deleteTask", async(request: FastifyRequest,reply: FastifyReply) => {
      await AuthMiddleware(request,reply)
      return new TaskDeleteController().handle(request,reply)
    }
    )
  }
