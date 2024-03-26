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
exports.UsersCreateController = void 0;
const RegisterUsers_service_1 = require("../../services/Users/RegisterUsers_service");
class UsersCreateController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const userData = request.body;
            const serviceUsers = new RegisterUsers_service_1.UsersService();
            yield serviceUsers.execute(userData);
            response.code(201).send({ message: `Você foi cadastrado com sucesso` });
        });
    }
}
exports.UsersCreateController = UsersCreateController;
