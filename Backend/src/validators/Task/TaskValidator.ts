import { TasksTypes } from "../../types/Task_types";
import { ExistsError } from "../../error/ExistsError";

const TaskCampos = (userData: Partial<TasksTypes>) => {
    
  if (userData.nametask === undefined) {
    throw new ExistsError("O Campo Nome da task não foi definido");
  }

  if (!userData.nametask.trim()) {
    throw new ExistsError("O Campo Nome da task não pode estar em branco");
  }
};

export { TaskCampos };
