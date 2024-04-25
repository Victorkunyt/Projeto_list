import { FastifyRequest, FastifyReply } from "fastify";
import { GetNotificationsService } from "../../services/Notifications/Notifications_service";
import { PrismaClient } from "@prisma/client";
import { LineNotification } from "../../types/Notification_types";

class GetNotificaionController {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }
  async handle(request: FastifyRequest, response: FastifyReply): Promise<void> {
    const userData = request.query as LineNotification;
    const Notification = new GetNotificationsService(this.prisma);
    const Getnotification = await Notification.execute(userData);

    response.send(Getnotification);
  }
}

export { GetNotificaionController };
