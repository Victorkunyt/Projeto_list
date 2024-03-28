import { FastifyRequest, FastifyReply } from "fastify";
import { DeleteUsersAllService } from "../../services/Users/DeleteUserAll_service";

class DeleteUsersAllController {

    async handle(response: FastifyReply): Promise<void> {
   
            const serviceUsersDelete = new DeleteUsersAllService();
            await serviceUsersDelete.execute();

            response.code(204);
}
    }


export { DeleteUsersAllController };
