import jwt from "jsonwebtoken";
import {LogType} from "../types/Login_types";

class GeneratorTokenProvider {


async execute(userData: LogType) {


    const token = jwt.sign({ userData }, "suaChaveSecreta", { 
        
        expiresIn: "5m",
        
     });

    return token
}

 

}


export {GeneratorTokenProvider}