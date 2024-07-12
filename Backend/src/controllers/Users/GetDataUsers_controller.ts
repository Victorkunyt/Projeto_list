import { FastifyRequest, FastifyReply } from "fastify";
import { GetDataUsersService } from "../../services/Users/GetDataUsers_service";
import { UserTypes } from "../../types/Users_types";
import { ExistsError } from '../../error/ExistsError';
import { PrismaClient } from "@prisma/client";

class GetDataUsersController {
    private prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
      this.prisma = prisma;
    }
    async handle(request: FastifyRequest,response: FastifyReply): Promise<void> {
            const userId = request.query as UserTypes; 
            const serviceUsersGet = new GetDataUsersService(this.prisma);
            try {
              const GetUsers = await serviceUsersGet.execute(userId);
              response.send(GetUsers);

            } catch (error) {
              if (error instanceof ExistsError) {
                response.status(400).send({ error: error.message });
              } else {
                response.send(error)
              }
            }

}
    }


export { GetDataUsersController };
