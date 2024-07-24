import { LineNotification } from "../../types/Notification_types";
import { ExistsError } from "../../error/ExistsError";

const NotificationId = (userData: Partial<LineNotification>) => {
  if (userData.userId === undefined) {
    throw new ExistsError("O userId não está definido.");
  }

  if (!userData.userId.trim()) {
    throw new ExistsError("userId é obrigatórios");
  }
};
export {NotificationId}