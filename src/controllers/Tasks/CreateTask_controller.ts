import { FastifyRequest, FastifyReply } from "fastify";
import { TaskService } from "../../services/Tasks/CreateTask_service";
import { TasksTypes } from "../../types/Task_types";
class TaskCreateController {

    async handle(request: FastifyRequest, response: FastifyReply): Promise<void> {
   
            const userData = request.body as TasksTypes
            const TaskUsers = new TaskService();
            await TaskUsers.execute(userData);

            response.code(201);
}
    }


export { TaskCreateController };
