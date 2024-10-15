import { FastifyRequest, FastifyReply } from "fastify";
import { GetUsersAllService } from "../../services/Users/GetAllUsers_service";
import { PrismaClient } from "@prisma/client";
import { UserTypes } from "../../types/Users_types";


class GetUsersAllController {
    private prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
      this.prisma = prisma;
    }
    async handle(request: FastifyRequest,response: FastifyReply): Promise<void> {
            const userData = request.query as UserTypes
            const serviceUsersGet = new GetUsersAllService(this.prisma);
            const GetUsers = await serviceUsersGet.execute(userData);

            response.send(GetUsers);
}
    }


export { GetUsersAllController };
