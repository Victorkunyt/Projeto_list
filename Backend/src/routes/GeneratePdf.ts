import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { GeneratePDFController } from "../controllers/GeneratePdf/GeneratePdf_controller";
import { GetPdfController } from "../controllers/GeneratePdf/GetPdf_controller";
import { AuthMiddleware } from "../middleware/auth";
import { PrismaClient } from "@prisma/client";

export async function routesPdf(fastify: FastifyInstance, options: FastifyPluginOptions) {
  fastify.register(async function(fastify) {
    fastify.addHook("preHandler", AuthMiddleware);

    const prisma = new PrismaClient();


    fastify.post("/generatePdf", async (request, reply) => {
      return new GeneratePDFController(prisma).handle(request, reply);
    });

    fastify.get("/pdf", async (request, reply) => {
      return new GetPdfController(prisma).handle(request, reply);
    });

  });
}
