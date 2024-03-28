import { FastifyRequest, FastifyReply } from "fastify";
import { GetUsersAllService } from "../../services/Users/GetAllUsers_service";

class GetUsersAllController {

    async handle(request: FastifyRequest,response: FastifyReply): Promise<void> {
   
            const serviceUsersGet = new GetUsersAllService();
            const GetUsers = await serviceUsersGet.execute();

            response.send(GetUsers);
}
    }


export { GetUsersAllController };
