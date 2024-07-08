import { PayloadCategory,IdCategoria } from "../../types/Category_types";
import { Iduser } from "../../types/Task_types";
import { ExistsError } from "../../error/ExistsError";


const CategoryCampos = (userData: Partial<PayloadCategory>) => {
  if (userData.nameCategory === undefined) {
    throw new ExistsError("O Campo Nome da Categoria não está definido.");
  }

  if (!userData.nameCategory.trim()) {
    throw new ExistsError("Campo Nome da Categoria é obrigatório");
  }

  if (userData.userId === undefined) {
    throw new ExistsError("O Parametro id do Usuario não está definido.");
  }

  if (!userData.userId.trim()) {
    throw new ExistsError("Parametro id do Usuario é obrigatório");
  }
  if (typeof userData.userId !== "string" || userData.userId.length !== 24) {
    throw new ExistsError("userId de usuário inválido");
  }
};

export { CategoryCampos };

const Idvalidação = (userData: Partial <Iduser>) => {

  if (userData.id === undefined) {
    throw new ExistsError("O Parametro id não foi definido");
  }
  
  if (!userData.id.trim()) {
    throw new ExistsError("O Parametro id não pode ser vazio ou nulo");
  }
  
  if (typeof userData.id !== 'string' || userData.id.length !== 24){
    throw new ExistsError("id inválido");
  }

}

export {Idvalidação}

const UpdateCategory = (userData: Partial <PayloadCategory>, IdCategory: Partial<IdCategoria>) => {

  if (userData.nameCategory === undefined) {
    throw new ExistsError("O Atributo nameCategory não foi definido");
  }
  
  if (!userData.nameCategory.trim()) {
    throw new ExistsError("O Nome da Categoria não pode ser vazio ou nulo");
  }
  
  if (typeof IdCategory.categoryId !== 'string' || IdCategory.categoryId.length !== 24){
    throw new ExistsError("id da categoria inválido");
  }
}

export {UpdateCategory}

const userIdOnly = (userData: Partial <PayloadCategory>) => {


  if (userData.userId === undefined) {
    throw new ExistsError("O Parametro userId não foi definido");
  }
  
  if (!userData.userId.trim()) {
    throw new ExistsError("O Parametro userId não pode ser vazio ou nulo");
  }
  
  if (typeof userData.userId !== 'string' || userData.userId.length !== 24){
    throw new ExistsError("userId inválido");
  }


}

export {userIdOnly}