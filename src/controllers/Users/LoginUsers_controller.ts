import { FastifyRequest, FastifyReply } from "fastify";
import { LoginService } from "../../services/Users/LoginUsers_service";
import { LogType } from "../../types/Login_types";

class LoginUserController {

    async handle(request: FastifyRequest, response: FastifyReply): Promise<void> {
   
            const userData = request.body as LogType; 
            const LoginUsers = new LoginService();
            const token = await LoginUsers.execute(userData);

            response.send({token});
}
    }


export { LoginUserController };
