import { PayloadCategory } from "../../types/Category_types";

const CategoryCampos = (userData: Partial<PayloadCategory>) => {
  if (userData.nameCategory === undefined) {
    throw new Error("O Campo Nome da Categoria não está definido.");
  }

  if (!userData.nameCategory.trim()) {
    throw new Error("Campo Nome da Categoria é obrigatório");
  }
};

export { CategoryCampos };
