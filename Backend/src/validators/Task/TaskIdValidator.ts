import { TasksTypes } from "../../types/Task_types";
import { Iduser } from "../../types/Task_types";
import { ExistsError } from "../../error/ExistsError";

const TaskID = (userData: Partial<TasksTypes>) => {
    
  if (userData.categoryId === undefined) {
    throw new ExistsError("O Campo categoryId não foi definido");
  }

  if (!userData.categoryId.trim()) {
    throw new ExistsError("O Parametro categoryId não pode ser vazio ou nulo");
  }

  if (typeof userData.categoryId !== 'string' || userData.categoryId.length !== 24){
    throw new ExistsError("categoryId inválido");
  }

  if (userData.userId === undefined) {
    throw new ExistsError("O Campo userId não foi definido");
  }

  if (!userData.userId.trim()) {
    throw new ExistsError("O Parametro userId não pode ser vazio ou nulo");
  }

  if (typeof userData.userId !== 'string' || userData.userId.length !== 24){
    throw new ExistsError("userId de usuário inválido");
  }
};

const IdUsuario = (userData: Partial<Iduser>) => {
    
  if (userData.id === undefined) {
    throw new ExistsError("O Campo id não foi definido");
  }

  if (!userData.id.trim()) {
    throw new ExistsError("O Parametro id não pode ser vazio ou nulo");
  }

  if (typeof userData.id !== 'string' || userData.id.length !== 24){
    throw new ExistsError("id inválido");
  }

};

export { TaskID, IdUsuario };
