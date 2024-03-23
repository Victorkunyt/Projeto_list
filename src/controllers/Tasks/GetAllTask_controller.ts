import { FastifyRequest, FastifyReply } from "fastify";
import { GetAllTaskService } from "../../services/Tasks/GetAllTask_service";

class TaskGetAllController {

    async handle(request: FastifyRequest, response: FastifyReply): Promise<void> {
    
            const GetAllTaskUsers = new GetAllTaskService();
            const GetReturn = await GetAllTaskUsers.execute();

            response.send(GetReturn);
}
    }


export { TaskGetAllController };
