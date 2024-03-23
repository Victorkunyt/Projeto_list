import { FastifyRequest,FastifyInstance,FastifyPluginOptions,FastifyReply} from "fastify"
import { CategoryCreateController } from "../controllers/Category/CreateCategory_controller"
import { GetCategoryController } from "../controllers/Category/GetCategory_controller"


export async function routesCategory(fastify: FastifyInstance, options: FastifyPluginOptions) {


    fastify.post("/registerCategory", async(request: FastifyRequest,reply: FastifyReply) => {
  
      return new CategoryCreateController().handle(request,reply)
    }
    )

    fastify.get("/category", async(request: FastifyRequest,reply: FastifyReply) => {
  
        return new GetCategoryController().handle(request,reply)
      }
      )

}