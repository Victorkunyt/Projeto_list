import { FastifyRequest, FastifyReply } from "fastify";
import { TaskService } from "../../services/Tasks/CreateTask_service";
import { TasksTypes } from "../../types/Task_types";
import { PrismaClient } from "@prisma/client";

class TaskCreateController {
    private prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
      this.prisma = prisma;
    }
    async handle(request: FastifyRequest, response: FastifyReply): Promise<void> {
   
            const userData = request.body as TasksTypes
            const TaskUsers = new TaskService(this.prisma);
            await TaskUsers.execute(userData);

            response.code(201);
}
    }


export { TaskCreateController };
