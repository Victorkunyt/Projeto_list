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
exports.LoginService = void 0;
const client_1 = require("@prisma/client");
const generate_1 = require("../../middleware/generate");
const LoginValidador_1 = require("../../validators/Login/LoginValidador");
class LoginService {
    execute(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const prisma = new client_1.PrismaClient();
            (0, LoginValidador_1.LoginCampos)(userData);
            const TableUsers = yield prisma.user.findMany({
                where: {
                    email: userData.login,
                    password: userData.password
                }
            });
            if (TableUsers.length === 0) {
                throw new Error('Login e password não registrado no banco de dados ');
            }
            const gerneratorTokenProvider = new generate_1.GeneratorTokenProvider();
            const token = yield gerneratorTokenProvider.execute(userData);
            return token;
        });
    }
}
exports.LoginService = LoginService;
