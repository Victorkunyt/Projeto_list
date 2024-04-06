import { FastifyRequest, FastifyReply } from "fastify";
import { GetUsersAllService } from "../../services/Users/GetAllUsers_service";
import { PrismaClient } from "@prisma/client";

class GetUsersAllController {
    private prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
      this.prisma = prisma;
    }
    async handle(request: FastifyRequest,response: FastifyReply): Promise<void> {
   
            const serviceUsersGet = new GetUsersAllService(this.prisma);
            const GetUsers = await serviceUsersGet.execute();

            response.send(GetUsers);
}
    }


export { GetUsersAllController };
