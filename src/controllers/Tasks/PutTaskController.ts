import { FastifyRequest, FastifyReply } from "fastify";
import { PutTaskService } from "../../services/Tasks/PutTask_service";
import { TasksTypes } from "../../types/Task_types";
class TaskUpdateController {

    async handle(request: FastifyRequest, response: FastifyReply): Promise<void> {
   
            const userData = request.body as TasksTypes; 
            const PutTaskUsers = new PutTaskService();
            const UpdateTaskReturn = await PutTaskUsers.execute(userData);

            response.send(UpdateTaskReturn);
}
    }


export { TaskUpdateController };
