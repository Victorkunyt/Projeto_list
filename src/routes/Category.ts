import { FastifyRequest,FastifyInstance,FastifyPluginOptions,FastifyReply} from "fastify"
import { CategoryCreateController } from "../controllers/Category/CreateCategory_controller"
import { GetCategoryController } from "../controllers/Category/GetCategory_controller"
import { AuthMiddleware } from "../middleware/auth";


export async function routesCategory(fastify: FastifyInstance, options: FastifyPluginOptions) {


    fastify.post("/registerCategory", async(request: FastifyRequest,reply: FastifyReply) => {
      await AuthMiddleware(request,reply)
      return new CategoryCreateController().handle(request,reply)
    }
    )

    fastify.get("/category", async(request: FastifyRequest,reply: FastifyReply) => {
      await AuthMiddleware(request,reply)
      return new GetCategoryController().handle(request,reply)
      }
      )

}