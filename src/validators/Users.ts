// validators.ts
import { UserTypes } from "../types/Users_types";

//////

const LineObrigatórios = (userData: Partial<UserTypes>) => {

if (!userData.cellphone || !userData.email || !userData.gender || !userData.holderid || !userData.name || !userData.password) {

throw new Error(`Por favor, forneça todas as informações necessárias para o cadastro, e todos os campos são obrigatórios`)
}

};

///////

const emailValidator = (userData: Partial<UserTypes>) => {

    if (userData.email === undefined) {
        throw new Error("O e-mail não está definido.");
    }
    let specialCaracterRegex = /[@]/;

    if (!specialCaracterRegex.test(userData.email) || !userData.email?.includes(".")) {
    
    throw new Error(`O Email precisa possuir (.,@)`)
    }
    
    };

export { LineObrigatórios,emailValidator };
