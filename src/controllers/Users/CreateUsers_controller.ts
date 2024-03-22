import { FastifyRequest, FastifyReply } from "fastify";
import { UsersService } from "../../services/Users/CreateUsers_service";
import { UserTypes } from "../../types/Users_types"; 

class UsersCreateController {

    async handle(request: FastifyRequest, response: FastifyReply): Promise<void> {
   
            const userData = request.body as UserTypes; 
            const serviceUsers = new UsersService();
            const newUser = await serviceUsers.execute(userData);

            response.code(201).send(newUser);
}
    }


export { UsersCreateController };
