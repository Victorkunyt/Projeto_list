"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const client_1 = require("@prisma/client");
const RegisterUsers_1 = require("../../validators/Login/RegisterUsers");
class UsersService {
    execute(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const prisma = new client_1.PrismaClient();
            (0, RegisterUsers_1.LineObrigatórios)(userData);
            (0, RegisterUsers_1.emailValidator)(userData);
            (0, RegisterUsers_1.CellphoneValidator)(userData);
            (0, RegisterUsers_1.HolderidphoneValidator)(userData);
            (0, RegisterUsers_1.GenderValidator)(userData);
            (0, RegisterUsers_1.PasswordValidator)(userData);
            const newUsers = yield prisma.user.create({
                data: {
                    name: userData.name,
                    holderid: userData.holderid,
                    status: true,
                    cellphone: userData.cellphone,
                    email: userData.email,
                    gender: userData.gender,
                    password: userData.password
                }
            });
            return newUsers;
        });
    }
}
exports.UsersService = UsersService;
