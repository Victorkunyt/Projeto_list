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
exports.routesUsers = void 0;
const RegisterUsers_controller_1 = require("../controllers/Users/RegisterUsers_controller");
const GetAllUsers_controller_1 = require("../controllers/Users/GetAllUsers_controller");
const DeleteAllUser_controller_1 = require("../controllers/Users/DeleteAllUser_controller");
const LoginUsers_controller_1 = require("../controllers/Users/LoginUsers_controller");
const auth_1 = require("../middleware/auth");
function routesUsers(fastify, options) {
    return __awaiter(this, void 0, void 0, function* () {
        fastify.post("/register", (request, reply) => __awaiter(this, void 0, void 0, function* () {
            return new RegisterUsers_controller_1.UsersCreateController().handle(request, reply);
        }));
        fastify.get("/getUsersAll", (request, reply) => __awaiter(this, void 0, void 0, function* () {
            yield (0, auth_1.AuthMiddleware)(request, reply);
            return new GetAllUsers_controller_1.GetUsersAllController().handle(request, reply);
        }));
        fastify.delete("/deleteUsers", (request, reply) => __awaiter(this, void 0, void 0, function* () {
            return new DeleteAllUser_controller_1.DeleteUsersAllController().handle(request, reply);
        }));
        fastify.post("/login", (request, reply) => __awaiter(this, void 0, void 0, function* () {
            return new LoginUsers_controller_1.LoginUserController().handle(request, reply);
        }));
    });
}
exports.routesUsers = routesUsers;
