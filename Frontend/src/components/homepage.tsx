/* eslint-disable @typescript-eslint/no-explicit-any */
import  { useState, useEffect } from "react";
import { category } from "../services/api";
import { useNavigate } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import RegisterTaskButton from "./ButtonRegisterTask";
import "./homepage.css";

interface HomePageProps {
  reload: boolean;
}

function HomePage({ reload }: HomePageProps) {
  const [categories, setCategories] = useState<any[]>([]);
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
        if (categoryData && categoryData.Category) {
          setCategories(categoryData.Category);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setIsLoading(false);
      }
    }

    if (reload) {
      fetchData(); // Chamamos a função fetchData se reload for true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]); // Mantemos navigate como dependência para garantir que useEffect seja reexecutado se navigate mudar

  const handleLogout = () => {
    // Lógica para fazer logout
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
      <div className="logout-button-container">
        <LogoutButton onClick={handleLogout} />

        <div className="RegisterTask-button-container">
        <RegisterTaskButton onClick={handleLogout}
        />
          </div>  
      </div>
    </div>
  );
}

export default HomePage;
