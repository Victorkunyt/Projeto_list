import { sendEmailLines } from "../../types/SendEmail_types";


const emailSendValidator = (userData: Partial<sendEmailLines>) => {
    if (userData.to === undefined) {
      throw new Error("O e-mail não está definido.");
    }
    let specialCaracterRegex = /[@]/;
  
    if (
      !specialCaracterRegex.test(userData.to) ||
      !userData.to?.includes(".")
    ) {
      throw new Error(`O Email precisa possuir (.,@)`);
    }
  };
  
  export {emailSendValidator}