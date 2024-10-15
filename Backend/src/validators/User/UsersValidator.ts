import { UserTypes } from "../../types/Users_types";
import { ExistsError } from '../../error/ExistsError';



const IdUser = (userData: Partial <UserTypes>) => {
if (!userData.holderid){
    if (userData.userId === undefined) {
      throw new ExistsError("O Parametro userId ou o holderid não foi definido");
    }
    
    if (!userData.userId.trim()) {
      throw new ExistsError("Passar parâmetro userId ou holderid");
    }
    
    if (typeof userData.userId !== 'string' || userData.userId.length !== 24){
      throw new ExistsError("userId inválido");
    }
  }
  
  }

  const Idonly = (userData: Partial <UserTypes>) => {
        if (userData.userId === undefined) {
          throw new ExistsError("O Parametro userId não foi definido");
        }
        
        if (!userData.userId.trim()) {
          throw new ExistsError("Passar parâmetro userId");
        }
        
        if (typeof userData.userId !== 'string' || userData.userId.length !== 24){
          throw new ExistsError("userId inválido");
        }
      
      
      }
  
  export {IdUser,Idonly}