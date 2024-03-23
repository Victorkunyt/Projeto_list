import { FastifyRequest, FastifyReply } from "fastify";
import { DeleteTaskService } from "../../services/Tasks/DeleteTask_service";
import { Iduser } from "../../types/Task_types";
class TaskDeleteController {

    async handle(request: FastifyRequest, response: FastifyReply): Promise<void> {
   
            const userData = request.query as Iduser; 
            const DeleteTaskUsers = new DeleteTaskService();
            await DeleteTaskUsers.execute(userData);

            response.code(204);
}
    }


export { TaskDeleteController };
