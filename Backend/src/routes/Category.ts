import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { CategoryCreateController } from "../controllers/Category/CreateCategory_controller";
import { GetCategoryController } from "../controllers/Category/GetCategory_controller";
import { CategoryDeleteController } from "../controllers/Category/DeleteCategory_controller";
import { AuthMiddleware } from "../middleware/auth";
import { PrismaClient } from "@prisma/client";

export async function routesCategory(fastify: FastifyInstance, options: FastifyPluginOptions) {
  fastify.register(async function(fastify) {
    fastify.addHook("preHandler", AuthMiddleware);

    const prisma = new PrismaClient();


    fastify.post("/registerCategory", async (request, reply) => {
      return new CategoryCreateController(prisma).handle(request, reply);
    });

    fastify.get("/category", async (request, reply) => {
      return new GetCategoryController(prisma).handle(request, reply);
    });

    fastify.delete("/deletecategory", async (request, reply) => {

      return new CategoryDeleteController(prisma).handle(request,reply)
    })
  });
}
