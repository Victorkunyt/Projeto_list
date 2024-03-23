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
