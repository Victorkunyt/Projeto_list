import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { CategoryCreateController } from "../controllers/Category/CreateCategory_controller";
import { GetCategoryController } from "../controllers/Category/GetCategory_controller";
import { AuthMiddleware } from "../middleware/auth";

export async function routesCategory(fastify: FastifyInstance, options: FastifyPluginOptions) {
    fastify.register(async function(fastify) {
        fastify.addHook("preHandler", AuthMiddleware);

        fastify.post("/registerCategory", async (request, reply) => {
            return new CategoryCreateController().handle(request, reply);
        });

        fastify.get("/category", async (request, reply) => {
            return new GetCategoryController().handle(request, reply);
        });
    });
}
