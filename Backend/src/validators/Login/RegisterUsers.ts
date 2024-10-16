// validators.ts
import { UserTypes } from "../../types/Users_types";
import { ExistsError } from "../../error/ExistsError";

const LineObrigatórios = (userData: Partial<UserTypes>) => {
  if (
    !userData.cellphone ||
    !userData.email ||
    !userData.gender ||
    !userData.holderid ||
    !userData.name ||
    !userData.password
  ) {
    throw new ExistsError(
      `Por favor todos os campos são obrigatórios`
    );
  }
};

///////

const HolderidphoneValidator = (userData: Partial<UserTypes>) => {
  if (userData.holderid === undefined) {
    throw new ExistsError("O holderId não está definido.");
  }

  const cpfvalidator = require("cpf-validator-tmc");

  const holderid = userData.holderid.trim();
  const onlyNumbers = /^\d+$/;

  if (!onlyNumbers.test(holderid)) {
    throw new ExistsError("O holderId deve conter apenas números.");
  }

  if (!cpfvalidator(holderid)) {
    throw new ExistsError("CPF inválido");
  }
};

const CellphoneValidator = (userData: Partial<UserTypes>) => {
  if (userData.cellphone === undefined) {
    throw new ExistsError("O CellPhone não está definido.");
  }

  if (userData.cellphone.length !== 11) {
    throw new ExistsError(`O Numero de Celular tem que ter 11 Digitos`);
  }

  const isNumeric = /^\d+$/;

  if (!isNumeric.test(userData.cellphone)) {
    throw new ExistsError(`O Número de Celular deve conter apenas dígitos`);
  }

  if (userData.cellphone.includes(' ')) {
    throw new ExistsError(`O Número de Celular não pode conter espaços`);
  }
};

const emailValidator = (userData: Partial<UserTypes>) => {
  if (userData.email === undefined) {
    throw new ExistsError("O e-mail não está definido.");
  }
  let specialCaracterRegex = /[@]/;

  if (
    !specialCaracterRegex.test(userData.email) ||
    !userData.email?.includes(".")
  ) {
    throw new ExistsError(`O Email precisa possuir (.@)`);
  }
};

///

const GenderValidator = (userData: Partial<UserTypes>) => {
  if (userData.gender === undefined) {
    throw new ExistsError("O Gender não está definido.");
  }

  if (
    userData.gender.toLowerCase() !== "m" &&
    userData.gender.toLowerCase() !== "f" &&
    userData.gender !== "Outros"
  ) {
    throw new ExistsError(`O sexo do usuário é somente M, F ou Outros`);
  }
};

const PasswordValidator = (userData: Partial<UserTypes>) => {
  if (userData.password === undefined) {
    throw new ExistsError("O Password não está definido.");
  }

  const numericDigitRegex = /\d/;
  const specialCharacterRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/;

  if (userData.password.length < 8) {
    throw new ExistsError("Senha precisa possuir pelo menos 8 caracteres");
  }

  if (!/[A-Z]/.test(userData.password)) {
    throw new ExistsError("Senha precisa possuir pelo menos 1 letra Maiúscula");
  }

  if (!/[a-z]/.test(userData.password)) {
    throw new ExistsError("Senha precisa possuir pelo menos 1 letra Minúscula");
  }

  if (!numericDigitRegex.test(userData.password)) {
    throw new ExistsError(
      "Senha precisa possuir pelo menos um Digito Numérico"
    );
  }

  if (!specialCharacterRegex.test(userData.password)) {
    throw new ExistsError(
      "Senha precisa possuir pelo menos um caractere especial (e.g, !@#$%)"
    );
  }
};

const AdminTypeValidator = (userData: Partial<UserTypes>) => {
  if (userData.adminUser === undefined) {
    throw new ExistsError("O adminUser não está definido.");
  }
  if (typeof userData.adminUser !== "boolean") {
    throw new ExistsError("Admin user é um booleano, só aceita true ou false");
  }
};

export {
  LineObrigatórios,
  emailValidator,
  CellphoneValidator,
  HolderidphoneValidator,
  GenderValidator,
  PasswordValidator,
  AdminTypeValidator,
};
