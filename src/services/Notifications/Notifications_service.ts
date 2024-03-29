import { PrismaClient } from "@prisma/client";
import { TasksTypes } from "../../types/Task_types";


class GetNotificationsService {
  async execute() {
    const prisma = new PrismaClient();

    const notification = await prisma.notification.findMany({});
    



    return {notification}

 
  }
}

export { GetNotificationsService };
