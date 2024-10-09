import { ExistsError } from "../../error/ExistsError";
import { UserIdImage } from "../../types/Upimage";


const IMGUserid = (userData: Partial<UserIdImage>) => {
  if (userData.userId === undefined) {
    throw new ExistsError("O userId não está definido.");
  }

  if (!userData.userId.trim()) {
    throw new ExistsError("userId é obrigatório");
  }
};
export {IMGUserid}