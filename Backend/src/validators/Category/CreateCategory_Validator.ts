import { PayloadCategory } from "../../types/Category_types";

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
