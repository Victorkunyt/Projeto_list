import { FastifyRequest, FastifyReply } from "fastify";
import { ToSharedService } from "../../services/ToShared/Shared_service";
import { LineShared } from "../../types/Shared_types";
import { PrismaClient } from "@prisma/client";

class ToSharedController {

    private prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
      this.prisma = prisma;
    }

    async handle(request: FastifyRequest, response: FastifyReply): Promise<void> {
   
            const userData = request.body as LineShared
            const ToShared= new ToSharedService(this.prisma);
            await ToShared.execute(userData);

            response.code(204).send("Update completed");
}
    }


export { ToSharedController };
