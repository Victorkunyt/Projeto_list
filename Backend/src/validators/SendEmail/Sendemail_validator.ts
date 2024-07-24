import { sendEmailLines } from "../../types/SendEmail_types";
import { ExistsError } from "../../error/ExistsError";


const emailSendValidator = (userData: Partial<sendEmailLines>) => {
    if (userData.to === undefined) {
      throw new ExistsError("O e-mail não está definido.");
    }
    let specialCaracterRegex = /[@]/;
  
    if (
      !specialCaracterRegex.test(userData.to) ||
      !userData.to?.includes(".")
    ) {
      throw new ExistsError(`O Email precisa possuir (.,@)`);
    }
  };
  
  export {emailSendValidator}