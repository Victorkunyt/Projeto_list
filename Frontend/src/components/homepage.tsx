/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { category, getUsers } from "../services/api"; // Importe a função getUsers do seu serviço de API
import { useNavigate } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import RegisterTaskButton from "./RegisterTaskButton";
import RegisterCategoryButton from "./ButtonRegisterCategory";
import Notificationtsx from './notification/notification';
import "./homepage.css";

interface HomePageProps {
  reload: boolean;
}

function HomePage({ reload }: HomePageProps) {
  const [categories, setCategories] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]); // Adicione o estado para armazenar os usuários
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem("token");
        const isLoggedIn = localStorage.getItem("isLoggedIn");
        if (!isLoggedIn) {
          navigate("/login");
          return;
        }
        const categoryData = await category(token);
        const userData = await getUsers(token); // Obtenha a lista de usuários
        if (categoryData && categoryData.Category) {
          setCategories(categoryData.Category);
        }
        if (userData && userData.users) {
          setUsers(userData.users); // Defina os usuários no estado
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    if (reload) {
      fetchData();
    }
  }, [navigate, reload]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="home-container">
      <div className="categories">
        {categories.map((category: any, index: number) => (
          <div className="category" key={index}>
            <h3>{category.nameCategory}</h3>
            <ul className="tasks">
              {category.tasks.map((task: any, taskIndex: number) => (
                <li key={taskIndex}>{task.nametask}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      {/* Inclua o componente Notification aqui */}
      <div className="home-container">
      {/* ... */}

      <div className="notification-container">
        <Notificationtsx reload={reload} />
      </div>

      {/* ... */}
    </div>

      <div className="logout-button-container">
        <LogoutButton onClick={handleLogout} />
      </div>
      <div className="RegisterTask2-button-container">
        {/* Passe as listas de categorias e usuários como props para RegisterTaskButton */}
        <RegisterCategoryButton onClick={function (): void {
          throw new Error("Function not implemented.");
        }} />
        <RegisterTaskButton categories={categories} users={users} />
      </div>
    </div>
  );
  
}

export default HomePage;
