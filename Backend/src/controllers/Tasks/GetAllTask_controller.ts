import { FastifyRequest, FastifyReply } from "fastify";
import { GetAllTaskService } from "../../services/Tasks/GetAllTask_service";
import { PrismaClient } from "@prisma/client";
import { TasksTypes } from "../../types/Task_types";

class TaskGetAllController {

    private prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
      this.prisma = prisma;
    }
    async handle(request: FastifyRequest, response: FastifyReply): Promise<void> {
            const userData = request.query as TasksTypes
            const GetAllTaskUsers = new GetAllTaskService(this.prisma);
            const GetReturn = await GetAllTaskUsers.execute(userData);

            response.send(GetReturn);
}
    }


export { TaskGetAllController };
