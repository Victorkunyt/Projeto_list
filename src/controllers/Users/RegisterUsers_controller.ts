import { FastifyRequest, FastifyReply } from "fastify";
import { UsersService } from "../../services/Users/RegisterUsers_service";
import { UserTypes } from "../../types/Users_types"; 

class UsersCreateController {

    async handle(request: FastifyRequest, response: FastifyReply): Promise<void> {
   
            const userData = request.body as UserTypes; 
            const serviceUsers = new UsersService();
            await serviceUsers.execute(userData);

            response.code(201).send({message: `Você foi cadastrado com sucesso`});
}
    }


export { UsersCreateController };
