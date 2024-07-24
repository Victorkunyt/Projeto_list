import { LineShared } from "../../types/Shared_types";
import { ExistsError } from "../../error/ExistsError";

const SharedCampos = (userData: Partial<LineShared>) => {
    
  if (userData.idTask === undefined) {
    throw new ExistsError("O Campo idTask não foi definido");
  }

  if (!userData.idTask.trim()) {
    throw new ExistsError("O Campo Id da task não pode estar em branco");
  }

  if (typeof userData.idTask !== 'string' || userData.idTask.length !== 24){
    throw new ExistsError("IdTask inválido");
  }

  if (userData.idUser === undefined) {
    throw new ExistsError("O Campo idUser não foi definido");
  }

  if (!userData.idUser.trim()) {
    throw new ExistsError("O Campo Id do User não pode estar em branco");
  }

  if (typeof userData.idUser !== 'string' || userData.idUser.length !== 24){
    throw new ExistsError("IdUser inválido");
  }

  if (userData.categoryId === undefined) {
    throw new ExistsError("O Campo categoryId não foi definido");
  }

  if (!userData.categoryId.trim()) {
    throw new ExistsError("O Campo Id da Categoria não pode estar em branco");
  }

  if (typeof userData.categoryId !== 'string' || userData.categoryId.length !== 24){
    throw new ExistsError("IdCategoria inválido");
  }
};

export { SharedCampos };
