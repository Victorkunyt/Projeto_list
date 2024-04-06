// validators.ts
import { UserTypes } from "../../types/Users_types";

//////

const LineObrigatórios = (userData: Partial<UserTypes>) => {
  if (
    !userData.cellphone ||
    !userData.email ||
    !userData.gender ||
    !userData.holderid ||
    !userData.name ||
    !userData.password
  ) {
    throw new Error(
      `Por favor, forneça todas as informações necessárias para o cadastro, e Todos os campos são obrigatórios`
    );
  }
};

///////

const HolderidphoneValidator = (userData: Partial<UserTypes>) => {
  if (userData.holderid === undefined) {
      throw new Error("O holderId não está definido.");
  }

  const cpfvalidator = require('cpf-validator-tmc');

  
  if (!cpfvalidator(userData.holderid.trim())) {
      throw new Error('CPF inválido');
  }
};

const CellphoneValidator = (userData: Partial<UserTypes>) => {
  if (userData.cellphone === undefined) {
    throw new Error("O CellPhone não está definido.");
  }

  if (userData.cellphone.length !== 11) {
    throw new Error(`O Numero de Celular tem que ter 11 Digitos`);
  }
};

const emailValidator = (userData: Partial<UserTypes>) => {
  if (userData.email === undefined) {
    throw new Error("O e-mail não está definido.");
  }
  let specialCaracterRegex = /[@]/;

  if (
    !specialCaracterRegex.test(userData.email) ||
    !userData.email?.includes(".")
  ) {
    throw new Error(`O Email precisa possuir (.,@)`);
  }
};

///

const GenderValidator = (userData: Partial<UserTypes>) => {
  if (userData.gender === undefined) {
      throw new Error("O Gender não está definido.");
  }

  if (userData.gender.toLowerCase() !== "m" && userData.gender.toLowerCase() !== "f" && userData.gender !== "Outros") {

    throw new Error(`O sexo do usuário é somente M, F ou Outros`)
  }

};

const PasswordValidator = (userData: Partial<UserTypes>) => {

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


}


export { LineObrigatórios, emailValidator,CellphoneValidator,HolderidphoneValidator,GenderValidator,PasswordValidator};






 


  

