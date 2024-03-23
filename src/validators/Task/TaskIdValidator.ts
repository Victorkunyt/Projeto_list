import { TasksTypes } from "../../types/Task_types";

const TaskID = (userData: Partial<TasksTypes>) => {
    
  if (userData.id === undefined) {
    throw new Error("O Campo id não foi definido");
  }

  if (!userData.id.trim()) {
    throw new Error("O Parametro id não pode ser vazio ou nulo");
  }
};

export { TaskID };
