import { FastifyRequest, FastifyReply } from "fastify";
import { Refresh_token } from "../../services/RefreshToken/RefreshToken_service";
import {LogType} from "../../types/Login_types";


class Refresh_tokenController { 
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const userData = request.body as LogType
        
        const generateToken = new Refresh_token();
        
        const token = await generateToken.execute(userData); 
        
        return token
    }
}

export { Refresh_tokenController };