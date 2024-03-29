import { FastifyRequest, FastifyReply } from "fastify";
import { GetNotificationsService } from "../../services/Notifications/Notifications_service";

class GetNotificaionController {

async handle(request: FastifyRequest, response: FastifyReply): Promise<void> {

const Notification = new GetNotificationsService()
const Getnotification = await Notification.execute()


response.send(Getnotification)
}



}

export {GetNotificaionController}