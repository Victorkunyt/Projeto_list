import { PrismaClient } from "@prisma/client";
import { TasksTypes } from "../../types/Task_types";


class GetNotificationsService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }
  async execute() {
    const prisma = new PrismaClient();

    const notification = await this.prisma.notification.findMany({});
    



    return {notification}

 
  }
}

export { GetNotificationsService };
