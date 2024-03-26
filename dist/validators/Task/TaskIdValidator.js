"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdUsuario = exports.TaskID = void 0;
const TaskID = (userData) => {
    if (userData.categoryId === undefined) {
        throw new Error("O Campo categoryId não foi definido");
    }
    if (!userData.categoryId.trim()) {
        throw new Error("O Parametro categoryId não pode ser vazio ou nulo");
    }
    if (typeof userData.categoryId !== 'string' || userData.categoryId.length !== 24) {
        throw new Error("categoryId inválido");
    }
    if (userData.userId === undefined) {
        throw new Error("O Campo userId não foi definido");
    }
    if (!userData.userId.trim()) {
        throw new Error("O Parametro userId não pode ser vazio ou nulo");
    }
    if (typeof userData.userId !== 'string' || userData.userId.length !== 24) {
        throw new Error("userId de usuário inválido");
    }
};
exports.TaskID = TaskID;
const IdUsuario = (userData) => {
    if (userData.id === undefined) {
        throw new Error("O Campo id não foi definido");
    }
    if (!userData.id.trim()) {
        throw new Error("O Parametro id não pode ser vazio ou nulo");
    }
};
exports.IdUsuario = IdUsuario;
