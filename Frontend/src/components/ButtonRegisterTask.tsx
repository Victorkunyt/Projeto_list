/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import "./ButtonRegisterTask.css";

interface TaskButtonProps {
  onClick: () => void;
}

// eslint-disable-next-line no-empty-pattern
const RegisterTaskButton: React.FC<TaskButtonProps> = ({ }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleCreateTaskClick = () => {
    // Abre o modal
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    // Fecha o modal
    setModalOpen(false);
  };

  return (
    <>
      <button className="CreateTask-button" onClick={handleCreateTaskClick}>
        Criar Categoria
      </button>
      {modalOpen && (
        <div className="modal">
          {/* Conteúdo do seu modal aqui */}
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>
              &times;
            </span>
            <h2>Criar Categoria</h2>
            {/* Outros componentes de criação de tarefa aqui */}
          </div>
        </div>
      )}
    </>
  );
};

export default RegisterTaskButton;
