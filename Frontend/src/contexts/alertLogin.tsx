import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle, faCheckCircle, faTimes } from '@fortawesome/free-solid-svg-icons';

interface CustomAlertProps {
  message: string;
  type?: 'success' | 'warning' | 'error';
}

const CustomAlert: React.FC<CustomAlertProps> = ({ message, type = 'error' }) => {
  const [closed, setClosed] = useState(false);

  let icon;
  let bgColor;
  let textColor;

  switch (type) {
    case 'success':
      icon = faCheckCircle;
      bgColor = '#28a745';
      textColor = '#ffffff';
      break;
    case 'warning':
      icon = faExclamationCircle;
      bgColor = '#ffc107';
      textColor = '#212529';
      break;
    case 'error':
    default:
      icon = faExclamationCircle;
      bgColor = '#dc3545';
      textColor = '#ffffff';
      break;
  }

  const handleClose = () => {
    setClosed(true);
  };

  if (closed) {
    return null; // Não renderizar o alerta se estiver fechado
  }

  return (
    <div style={{ backgroundColor: bgColor, color: textColor, padding: '10px', marginBottom: '10px', borderRadius: '5px', display: 'flex', alignItems: 'center' }}>
      <FontAwesomeIcon icon={icon} style={{ marginRight: '10px' }} />
      <span>{message}</span>
      <button style={{ marginLeft: 'auto', border: 'none', background: 'none', cursor: 'pointer' }} onClick={handleClose}>
        <FontAwesomeIcon icon={faTimes} />
      </button>
    </div>
  );
};

export default CustomAlert;
