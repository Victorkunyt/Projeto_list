import { FastifyRequest, FastifyReply } from "fastify";
import jwt from "jsonwebtoken";

export async function AuthMiddleware(req: FastifyRequest, res: FastifyReply, next: () => void) {
    const auth = req.headers["authorization"];

    if (!auth || typeof auth !== "string") {
        return res.code(401).send({ message: "Token não passado" });
    }

    const [, token] = auth.split(" ");

    try {
        jwt.verify(token, "suaChaveSecreta");
        next(); 
    } catch (error) {
        return res.code(401).send({ message: "Token de autenticação inválido ou expirado" });
    }
}
