import { FastifyRequest, FastifyReply } from "fastify";
import { PayloadCategory,IdCategoria } from "../../types/Category_types";
import { PrismaClient } from "@prisma/client";
import { PutCategory } from "../../services/Categorys/PutCategory_service";
import { ExistsError } from "../../error/ExistsError";

class CategoryUpdateController {

    private prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
      this.prisma = prisma;
    }

    async handle(request: FastifyRequest, response: FastifyReply): Promise<void> {

            const userData = request.body as PayloadCategory; 
            const id = request.query as IdCategoria;
            const PutTaskUsers = new PutCategory(this.prisma);

            try {
              await PutTaskUsers.execute(userData,id);
              response.code(204);
            } catch (error) {
              if (error instanceof ExistsError) {
                response.status(400).send({ error: error.message });
              } else {
                response.send(error)
              }
            }

}
    }


export { CategoryUpdateController };
