import { PrismaClient } from "@prisma/client";
import { LineNotification } from "../../types/Notification_types";
import { NotificationId } from "../../validators/Notification/Notification_validator";

class GetNotificationsService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async execute(userData: LineNotification) {
    NotificationId(userData);

    const now = new Date();
    const notification = await this.prisma.notification.findMany({
      where: {
        recipientId: userData.userId,
        OR: [
          { expiresAt: null },  // Inclui notificações que não têm expiração definida
          { expiresAt: { gt: now } }  // Inclui notificações que não expiraram ainda
        ]
      }
    });

    if (notification.length === 0) {
      return { message: "Nenhuma Notificação encontrada" };
    }

    return { notification };
  }
}

export { GetNotificationsService };
