import { FastifyRequest, FastifyInstance, FastifyPluginOptions, FastifyReply } from "fastify";
import { CategoryCreateController } from "../controllers/Category/CreateCategory_controller";
import { GetCategoryController } from "../controllers/Category/GetCategory_controller";
import { AuthMiddleware } from "../middleware/auth";

export async function routesCategory(fastify: FastifyInstance, options: FastifyPluginOptions) {

    fastify.post("/registerCategory", { preHandler: AuthMiddleware }, async (request: FastifyRequest, reply: FastifyReply) => {
        return new CategoryCreateController().handle(request, reply);
    });

    fastify.get("/category", { preHandler: AuthMiddleware }, async (request: FastifyRequest, reply: FastifyReply) => {
        return new GetCategoryController().handle(request, reply);
    });

}
