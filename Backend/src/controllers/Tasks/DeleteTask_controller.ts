import { FastifyRequest, FastifyReply } from "fastify";
import { DeleteTaskService } from "../../services/Tasks/DeleteTask_service";
import { Id } from "../../types/Task_types";
import { PrismaClient } from "@prisma/client";

class TaskDeleteController {
    private prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
      this.prisma = prisma;
    }
    async handle(request: FastifyRequest, response: FastifyReply): Promise<void> {
   
            const userData = request.query as Id; 
            const DeleteTaskUsers = new DeleteTaskService(this.prisma);
            await DeleteTaskUsers.execute(userData);

            response.code(204);
}
    }


export { TaskDeleteController };
