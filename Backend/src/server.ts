import fastify from "fastify";
import cors from "@fastify/cors";
import { routesUsers } from "./routes/Users";
import { routesTask } from "./routes/Tasks";
import { routesCategory } from "./routes/Category";
import { routesRefreshToken } from "./routes/Refresh";
import { routesShared } from "./routes/ToShared";
import { routesNotification } from "./routes/Notification";



const app = fastify({logger: true});
const PORT = parseInt(`${process.env.PORT || 3333}`);

// Plugin do CORS
 app.register(cors);

// Registrando todas as Rotas
 const route = [routesUsers, routesTask, routesCategory,routesRefreshToken,routesShared,routesNotification];

 route.forEach(rotas => {
   app.register(rotas);
 })

// Plugin JWT
app.register(require('@fastify/jwt'), {
  secret: 'supersecret'
});

app.setErrorHandler((error, request, reply) => {
  reply.code(400).send({message : error.message});
});

const start = async () => {
  try {
    await app.listen({ port: PORT });
  } catch (err) {
    console.error('Ocorreu um erro ao iniciar o servidor:', err);
    process.exit(1);
  }
};

start();
