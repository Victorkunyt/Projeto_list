import { FastifyRequest, FastifyReply } from "fastify";
import { DeleteTaskService } from "../../services/Tasks/DeleteTask_service";
import { TasksTypes } from "../../types/Task_types";
class TaskDeleteController {

    async handle(request: FastifyRequest, response: FastifyReply): Promise<void> {
   
            const userData = request.query as TasksTypes; 
            const DeleteTaskUsers = new DeleteTaskService();
            await DeleteTaskUsers.execute(userData);

            response.code(204);
}
    }


export { TaskDeleteController };
