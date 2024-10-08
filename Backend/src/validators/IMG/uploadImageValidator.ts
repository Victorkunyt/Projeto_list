import { paramImage } from "../../types/Upimage";
import { ExistsError } from "../../error/ExistsError";

const IMGparam = (userData: Partial<paramImage>) => {
  if (userData.userId === undefined) {
    throw new ExistsError("O userId não está definido.");
  }

  if (!userData.userId.trim()) {
    throw new ExistsError("userId é obrigatórios");
  }

};
export {IMGparam}