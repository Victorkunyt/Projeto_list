import { paramImage } from "../../types/Upimage";
import { ExistsError } from "../../error/ExistsError";
import { UserIdImage } from "../../types/Upimage";

const IMGparam = (userData: Partial<paramImage>) => {
  if (userData.id === undefined) {
    throw new ExistsError("O id não está definido.");
  }

  if (!userData.id.trim()) {
    throw new ExistsError("id é obrigatório");
  }

};
export {IMGparam}

const IMGUserid = (userData: Partial<UserIdImage>) => {
  if (userData.userId === undefined) {
    throw new ExistsError("O userId não está definido.");
  }

  if (!userData.userId.trim()) {
    throw new ExistsError("userId é obrigatório");
  }
};
export {IMGUserid}