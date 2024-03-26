"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function AuthMiddleware(req, res) {
    const auth = req.headers["authorization"];
    if (!auth || typeof auth !== "string") {
        return res.code(401).send({ message: "Token não passado" });
    }
    const [, token] = auth.split(" ");
    try {
        jsonwebtoken_1.default.verify(token, "suaChaveSecreta");
        return;
    }
    catch (error) {
        return res.code(401).send({ message: "Token de autenticação inválido ou expirado" });
    }
}
exports.AuthMiddleware = AuthMiddleware;
