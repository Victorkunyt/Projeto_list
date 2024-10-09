import { paramImage } from "../../types/Upimage";
import { ExistsError } from "../../error/ExistsError";

const IMGparam = (userData: Partial<paramImage>) => {
  if (userData.id === undefined) {
    throw new ExistsError("O id não está definido.");
  }

  if (!userData.id.trim()) {
    throw new ExistsError("id é obrigatório");
  }

};
export {IMGparam}