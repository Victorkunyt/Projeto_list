import { FastifyRequest, FastifyReply } from "fastify";
import { GetSharedTaskService } from "../../services/ToShared/GetShared_service";
import { PrismaClient } from "@prisma/client";

class SharedTaskGetAllController {

    private prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
      this.prisma = prisma;
    }
    async handle(request: FastifyRequest, response: FastifyReply): Promise<void> {
    
            const SharedGetAllTaskUsers = new GetSharedTaskService(this.prisma);
            const GetReturn = await SharedGetAllTaskUsers.execute();

            response.send(GetReturn);
}
    }


export { SharedTaskGetAllController };
