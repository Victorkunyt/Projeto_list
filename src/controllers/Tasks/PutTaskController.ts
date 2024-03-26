import { FastifyRequest, FastifyReply } from "fastify";
import { PutTaskService } from "../../services/Tasks/PutTask_service";
import { TasksTypes,Iduser } from "../../types/Task_types";
class TaskUpdateController {

    async handle(request: FastifyRequest, response: FastifyReply): Promise<void> {

            const userData = request.body as TasksTypes; 
            const id = request.query as Iduser;
            const PutTaskUsers = new PutTaskService();
            const UpdateTaskReturn = await PutTaskUsers.execute(userData,id);

            response.send(UpdateTaskReturn);
}
    }


export { TaskUpdateController };
