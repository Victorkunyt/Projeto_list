import { FastifyRequest, FastifyReply } from "fastify";
import { PutTaskService } from "../../services/Tasks/PutTask_service";
import { TasksTypes,Iduser } from "../../types/Task_types";
import { PrismaClient } from "@prisma/client";

class TaskUpdateController {

    private prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
      this.prisma = prisma;
    }

    async handle(request: FastifyRequest, response: FastifyReply): Promise<void> {

            const userData = request.body as TasksTypes; 
            const id = request.query as Iduser;
            const PutTaskUsers = new PutTaskService(this.prisma);
            await PutTaskUsers.execute(userData,id);

            response.code(204);
}
    }


export { TaskUpdateController };
