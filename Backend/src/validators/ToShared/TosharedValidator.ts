import { LineShared } from "../../types/Shared_types";

const SharedCampos = (userData: Partial<LineShared>) => {
    
  if (userData.idTask === undefined) {
    throw new Error("O Campo idTask não foi definido");
  }

  if (!userData.idTask.trim()) {
    throw new Error("O Campo Id da task não pode estar em branco");
  }

  if (typeof userData.idTask !== 'string' || userData.idTask.length !== 24){
    throw new Error("IdTask inválido");
  }

  if (userData.idUser === undefined) {
    throw new Error("O Campo idUser não foi definido");
  }

  if (!userData.idUser.trim()) {
    throw new Error("O Campo Id do User não pode estar em branco");
  }

  if (typeof userData.idUser !== 'string' || userData.idUser.length !== 24){
    throw new Error("IdUser inválido");
  }

  if (userData.categoryId === undefined) {
    throw new Error("O Campo categoryId não foi definido");
  }

  if (!userData.categoryId.trim()) {
    throw new Error("O Campo Id da Categoria não pode estar em branco");
  }

  if (typeof userData.categoryId !== 'string' || userData.categoryId.length !== 24){
    throw new Error("IdCategoria inválido");
  }
};

export { SharedCampos };
