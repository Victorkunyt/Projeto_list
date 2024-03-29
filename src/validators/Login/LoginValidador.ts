import { LogType } from "../../types/Login_types";

const LoginCampos = (userData: Partial<LogType>) => {
  if (userData.login === undefined) {
    throw new Error("O Campo Login e senha não está definido.");
  }

  if (!userData.login.trim() || !userData.password?.trim()) {
    throw new Error("Campos de Login e senha são obrigatórios");
  }


};

export { LoginCampos };

const RefreshLine = (userData: Partial<LogType>) =>  {

  if (userData.refresh_token === undefined) {
    throw new Error("O Campo refresh_token não está definido.");
  }
  
  if (!userData.refresh_token.trim() || !userData.refresh_token?.trim() || typeof userData.refresh_token !== 'string' || userData.refresh_token.length !== 24) {
    throw new Error("O Campo refresh_token é obrigatório");
  }
}

export {RefreshLine}
