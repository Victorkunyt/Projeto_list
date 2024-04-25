import { LineNotification } from "../../types/Notification_types";

const NotificationId = (userData: Partial<LineNotification>) => {
  if (userData.userId === undefined) {
    throw new Error("O userId não está definido.");
  }

  if (!userData.userId.trim() || !userData.userId?.trim()) {
    throw new Error("userId é obrigatórios");
  }
};
export {NotificationId}