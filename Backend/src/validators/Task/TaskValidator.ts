import { TasksTypes } from "../../types/Task_types";

const TaskCampos = (userData: Partial<TasksTypes>) => {
    
  if (userData.nametask === undefined) {
    throw new Error("O Campo Nome da task não foi definido");
  }

  if (!userData.nametask.trim()) {
    throw new Error("O Campo Nome da task não pode estar em branco");
  }
};

export { TaskCampos };
