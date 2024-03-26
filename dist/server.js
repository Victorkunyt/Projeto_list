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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const cors_1 = __importDefault(require("@fastify/cors"));
const Users_1 = require("./routes/Users");
const Tasks_1 = require("./routes/Tasks");
const Category_1 = require("./routes/Category");
const app = (0, fastify_1.default)({ logger: false });
const PORT = parseInt(`${process.env.PORT || 3333}`);
// Plugin do CORS
app.register(cors_1.default);
// Rotas de usuário, tarefa e categoria
app.register(Users_1.routesUsers);
app.register(Tasks_1.routesTask);
app.register(Category_1.routesCategory);
// Plugin JWT
app.register(require('@fastify/jwt'), {
    secret: 'supersecret'
});
app.setErrorHandler((error, request, reply) => {
    reply.code(400).send({ message: error.message });
});
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield app.listen({ port: PORT });
        console.log(`Server is running at ${PORT}`);
    }
    catch (err) {
        console.error('Ocorreu um erro ao iniciar o servidor:', err);
        process.exit(1);
    }
});
start();
// const routeCategories = [routesUsers, routesTasks, routesCategories, ...outrasCategorias];
// // Registre cada categoria de rota
// routeCategories.forEach(category => {
//   app.register(category);
// })
