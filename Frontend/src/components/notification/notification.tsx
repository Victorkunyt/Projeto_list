/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import './notification.css';
import { notifications } from '../../services/api'; // Verifique se a importação está correta aqui
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

interface NotificationProps {
  reload: boolean;
}

interface Notification {
  id: string;
  type: string;
  recipientId: string;
  timestamp: string;
}

const Notificationtsx = ({ reload }: NotificationProps) => {
    const [notificationList] = useState<Notification[]>([]);

  // Função para buscar notificações
  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await notifications(token);
      if (!response) {
        return;
      }
    } catch (error) {
      console.error('Erro ao buscar notificações:', error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [reload]);

  return (
    <div className="notification-container">
      <div className="notification-content">
        <FontAwesomeIcon icon={faBell} size="2x" />
        <div className="notifications">
        {notificationList.map((notification) => (
  <div key={notification.id} className="notification">
    <p>{notification.type}</p>
  </div>
))}

        </div>
      </div>
    </div>
  );
};

export default Notificationtsx;
