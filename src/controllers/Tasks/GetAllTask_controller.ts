import { FastifyRequest, FastifyReply } from "fastify";
import { GetAllTaskService } from "../../services/Tasks/GetAllTask_service";
import { PrismaClient } from "@prisma/client";

class TaskGetAllController {

    private prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
      this.prisma = prisma;
    }
    async handle(request: FastifyRequest, response: FastifyReply): Promise<void> {
    
            const GetAllTaskUsers = new GetAllTaskService(this.prisma);
            const GetReturn = await GetAllTaskUsers.execute();

            response.send(GetReturn);
}
    }


export { TaskGetAllController };
