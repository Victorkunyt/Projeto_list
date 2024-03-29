import { FastifyRequest, FastifyReply } from "fastify";
import { ToSharedService } from "../../services/ToShared/Shared_service";
import { LineShared } from "../../types/Shared_types";
class ToSharedController {

    async handle(request: FastifyRequest, response: FastifyReply): Promise<void> {
   
            const userData = request.body as LineShared
            const ToShared= new ToSharedService();
            await ToShared.execute(userData);

            response.code(204).send("Update completed");
}
    }


export { ToSharedController };
