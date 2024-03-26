"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordValidator = exports.GenderValidator = exports.HolderidphoneValidator = exports.CellphoneValidator = exports.emailValidator = exports.LineObrigatórios = void 0;
//////
const LineObrigatórios = (userData) => {
    if (!userData.cellphone ||
        !userData.email ||
        !userData.gender ||
        !userData.holderid ||
        !userData.name ||
        !userData.password) {
        throw new Error(`Por favor, forneça todas as informações necessárias para o cadastro, e Todos os campos são obrigatórios`);
    }
};
exports.LineObrigatórios = LineObrigatórios;
///////
const HolderidphoneValidator = (userData) => {
    if (userData.holderid === undefined) {
        throw new Error("O holderId não está definido.");
    }
    const cpfvalidator = require('cpf-validator-tmc');
    if (!cpfvalidator(userData.holderid.trim())) {
        throw new Error('CPF inválido');
    }
};
exports.HolderidphoneValidator = HolderidphoneValidator;
const CellphoneValidator = (userData) => {
    if (userData.cellphone === undefined) {
        throw new Error("O CellPhone não está definido.");
    }
    if (userData.cellphone.length !== 11) {
        throw new Error(`O Numero de Celular tem que ter 11 Digitos`);
    }
};
exports.CellphoneValidator = CellphoneValidator;
const emailValidator = (userData) => {
    var _a;
    if (userData.email === undefined) {
        throw new Error("O e-mail não está definido.");
    }
    let specialCaracterRegex = /[@]/;
    if (!specialCaracterRegex.test(userData.email) ||
        !((_a = userData.email) === null || _a === void 0 ? void 0 : _a.includes("."))) {
        throw new Error(`O Email precisa possuir (.,@)`);
    }
};
exports.emailValidator = emailValidator;
///
const GenderValidator = (userData) => {
    if (userData.gender === undefined) {
        throw new Error("O Gender não está definido.");
    }
    if (userData.gender.toLowerCase() !== "m" && userData.gender.toLowerCase() !== "f" && userData.gender !== "Outros") {
        throw new Error(`O sexo do usuário é somente M, F ou Outros`);
    }
};
exports.GenderValidator = GenderValidator;
const PasswordValidator = (userData) => {
    if (userData.password === undefined) {
        throw new Error("O Password não está definido.");
    }
    const numericDigitRegex = /\d/;
    const specialCharacterRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/;
    if (userData.password.length < 8) {
        throw new Error('Senha precisa possuir pelo menos 8 caracteres');
    }
    if (!/[A-Z]/.test(userData.password)) {
        throw new Error('Senha precisa possuir pelo menos 1 letra Maiúscula');
    }
    if (!/[a-z]/.test(userData.password)) {
        throw new Error('Senha precisa possuir pelo menos 1 letra Minúscula');
    }
    if (!numericDigitRegex.test(userData.password)) {
        throw new Error('Senha precisa possuir pelo menos um Digito Numérico');
    }
    if (!specialCharacterRegex.test(userData.password)) {
        throw new Error('Senha precisa possuir pelo menos um caractere especial (e.g, !@#$%)');
    }
};
exports.PasswordValidator = PasswordValidator;
