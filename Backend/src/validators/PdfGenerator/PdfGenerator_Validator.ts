import { UserNames } from '../../types/PdfGenerator_types';
import { ExistsError } from '../../error/ExistsError';


const userIdOnlyName = (userData: Partial <UserNames>) => {


    if (userData.userId === undefined) {
      throw new ExistsError("O Campo userId não foi definido");
    }
    
    if (!userData.userId.trim()) {
      throw new ExistsError("O Parametro userId não pode ser vazio ou nulo");
    }
    
    if (typeof userData.userId !== 'string' || userData.userId.length !== 24){
      throw new ExistsError("userId inválido");
    }
  
  
  }
  
  export {userIdOnlyName}