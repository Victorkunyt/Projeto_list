import { payloadNewPassword } from "../../types/NewPassword_types";
import { userIdNewPassword } from "../../types/NewPassword_types";


const NewPasswordLines = (userData: Partial<payloadNewPassword>) => {


        if (userData.newpassword === undefined || userData.repeatNewpassword === undefined) {
          throw new Error("O Payload não está definido.");
      }

        const numericDigitRegex = /\d/;
        const specialCharacterRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/;
      
        if (userData.newpassword.length < 8) {
          throw new Error('A Nova Senha precisa possuir pelo menos 8 caracteres');
        }
      
        if (!/[A-Z]/.test(userData.newpassword)) {
          throw new Error('A Nova Senha precisa possuir pelo menos 1 letra Maiúscula');
        }
      
        if (!/[a-z]/.test(userData.newpassword)) {
          throw new Error('A Nova Senha precisa possuir pelo menos 1 letra Minúscula');
        }
      
        if (!numericDigitRegex.test(userData.newpassword)) {
          throw new Error('A Nova Senha precisa possuir pelo menos um Digito Numérico');
        }
      
        if (!specialCharacterRegex.test(userData.newpassword)) {
          throw new Error('A Nova Senha precisa possuir pelo menos um caractere especial (e.g, !@#$%)');
        }
      
       
          ////// COMPARAÇÃO ////

          if (userData.newpassword !== userData.repeatNewpassword) {
            throw new Error('Repita a Senha nova que você colocou!');

          }
      
      }



  export {NewPasswordLines}



  const NewPasswordId = (userData: Partial<userIdNewPassword>) => {


    if (userData.userId === undefined) {
      throw new Error("O Parametro userId não foi definido");
    }
  
    if (!userData.userId.trim()) {
      throw new Error("O Parametro userId não pode ser vazio ou nulo");
    }
  
    if (typeof userData.userId !== 'string' || userData.userId.length !== 24){
      throw new Error("userId de usuário inválido");
    }

  }

  export {NewPasswordId}