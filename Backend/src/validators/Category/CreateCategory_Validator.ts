import { PayloadCategory } from "../../types/Category_types";
import { Iduser } from "../../types/Task_types";


const CategoryCampos = (userData: Partial<PayloadCategory>) => {
  if (userData.nameCategory === undefined) {
    throw new Error("O Campo Nome da Categoria não está definido.");
  }

  if (!userData.nameCategory.trim()) {
    throw new Error("Campo Nome da Categoria é obrigatório");
  }

  if (userData.userId === undefined) {
    throw new Error("O Campo id do Usuario não está definido.");
  }

  if (!userData.userId.trim()) {
    throw new Error("Campo id do Usuario é obrigatório");
  }
  if (typeof userData.userId !== "string" || userData.userId.length !== 24) {
    throw new Error("userId de usuário inválido");
  }
};

export { CategoryCampos };

const Idvalidação = (userData: Partial <Iduser>) => {

  if (userData.id === undefined) {
    throw new Error("O Campo id não foi definido");
  }
  
  if (!userData.id.trim()) {
    throw new Error("O Parametro id não pode ser vazio ou nulo");
  }
  
  if (typeof userData.id !== 'string' || userData.id.length !== 24){
    throw new Error("id inválido");
  }

}

export {Idvalidação}

