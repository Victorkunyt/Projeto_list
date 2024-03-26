"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryCampos = void 0;
const CategoryCampos = (userData) => {
    if (userData.nameCategory === undefined) {
        throw new Error("O Campo Nome da Categoria não está definido.");
    }
    if (!userData.nameCategory.trim()) {
        throw new Error("Campo Nome da Categoria é obrigatório");
    }
};
exports.CategoryCampos = CategoryCampos;
