"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginCampos = void 0;
const LoginCampos = (userData) => {
    var _a;
    if (userData.login === undefined) {
        throw new Error("O Campo Login e senha não está definido.");
    }
    if (!userData.login.trim() || !((_a = userData.password) === null || _a === void 0 ? void 0 : _a.trim())) {
        throw new Error("Campos de Login e senha são obrigatórios");
    }
};
exports.LoginCampos = LoginCampos;
