import { FastifyRequest, FastifyReply } from "fastify";
import jwt from "jsonwebtoken";

export async function AuthMiddleware(request: FastifyRequest, reply: FastifyReply) {
    const auth = request.headers["authorization"];

    if (!auth || typeof auth !== "string") {
        reply.code(401).send({ message: "Token não passado" });
        return;
    }

    const [, token] = auth.split(" ");

    try {
        jwt.verify(token, "suaChaveSecreta");
    } catch (error) {
        if (error === "TokenExpiredError") {
            reply.code(401).send({ message: "Token expirado" });
        } else {
            reply.code(401).send({ message: "Token de autenticação inválido" });
        }
        return;
    }
}
