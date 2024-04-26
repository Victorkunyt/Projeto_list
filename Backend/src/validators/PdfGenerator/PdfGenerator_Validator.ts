import { UserNames } from '../../types/PdfGenerator_types';


const userIdOnlyName = (userData: Partial <UserNames>) => {


    if (userData.userId === undefined) {
      throw new Error("O Campo userId não foi definido");
    }
    
    if (!userData.userId.trim()) {
      throw new Error("O Parametro userId não pode ser vazio ou nulo");
    }
    
    if (typeof userData.userId !== 'string' || userData.userId.length !== 24){
      throw new Error("userId inválido");
    }
  
  
  }
  
  export {userIdOnlyName}