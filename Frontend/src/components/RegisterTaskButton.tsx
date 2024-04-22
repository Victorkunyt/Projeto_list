/* eslint-disable no-empty-pattern */
import React, { useState } from "react";
import "./ButtonRegisterCategory.css";
import { registerTask } from "../services/api";
import CustomAlert from "../contexts/alertLogin"; // Seu componente de alerta

interface RegisterTaskButtonProps {
  categories: { id: string; nameCategory: string }[];
  users: { id: string; name: string }[];
}

const RegisterTaskButton: React.FC<RegisterTaskButtonProps> = ({ categories, }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [nametask, setTaskName] = useState("");
  const [error, setError] = useState<string>(""); // Defina o tipo para o estado error
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const selectedUserId = "6622ae8865519f44fd5e2f29"
  const handleCreateTaskClick = () => {
    // Abre o modal
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    // Fecha o modal
    setModalOpen(false);
  };

  const handleCategoryNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Atualiza o estado com o valor do campo de entrada
    setTaskName(event.target.value);
  };

  const handleCreateTask = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!nametask.trim()) { 
        setError("Por favor, insira um nome para a Tarefa.");
        return;
      }

      await registerTask(token, nametask, selectedCategoryId, selectedUserId);
      
      // Fecha o modal após criar a categoria
      setModalOpen(false);
      window.location.reload();

    } catch (error) {
      console.error("Erro ao criar categoria:", error);
      // Trate o erro conforme necessário, por exemplo, exibindo uma mensagem de erro para o usuário
    }
  };

  return (
    <>
      {!modalOpen && (
        <button className="CreateTask-button" onClick={handleCreateTaskClick}>
          Criar Tarefa
        </button>
      )}
      {modalOpen && (
        <div className="modal">
          {/* Conteúdo do seu modal aqui */}
          <div className="modal-content">
          {error && <CustomAlert message={error} />}
            <span className="close" onClick={handleCloseModal}>
              &times;
            </span>
            <h2>Criar Tarefa</h2>
            {/* Campo de entrada para o nome da categoria */}
            <input
              type="text"
              value={nametask}
              onChange={handleCategoryNameChange}
              placeholder="Nome da Tarefa"
            />
            {/* Dropdown para selecionar a categoria */}
            <select value={selectedCategoryId} onChange={(e) => setSelectedCategoryId(e.target.value)}>
              <option value="">Selecione uma categoria</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>{category.nameCategory}</option>
              ))}
            </select>
            {/* Dropdown para selecionar o usuário */}

            {/* Exibe a mensagem de erro, se houver */}
            {/* Botão para criar a categoria */}
            <button onClick={handleCreateTask}>Criar</button>
          </div>
        </div>
      )}
    </>
  );
};

export default RegisterTaskButton;

