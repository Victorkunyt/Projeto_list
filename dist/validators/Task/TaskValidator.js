"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskCampos = void 0;
const TaskCampos = (userData) => {
    if (userData.nametask === undefined) {
        throw new Error("O Campo Nome da task não foi definido");
    }
    if (!userData.nametask.trim()) {
        throw new Error("O Campo Nome da task não pode estar em branco");
    }
};
exports.TaskCampos = TaskCampos;
