import fastify from "fastify";
import cors from "@fastify/cors";
import { routesUsers } from "./routes/Users";
import { routesTask } from "./routes/Tasks";
import { routesCategory } from "./routes/Category";
import { routesRefreshToken } from "./routes/Refresh";
import { routesShared } from "./routes/ToShared";
import { routesNotification } from "./routes/Notification";
import { routesPdf } from "./routes/GeneratePdf";
import { routesNewpassword } from "./routes/Pass";
import { routesSendEmail } from "./routes/SendEmail";
import fastifyJwt from '@fastify/jwt';

const app = fastify({ logger: true });
const PORT = parseInt(`${process.env.PORT || 3333}`);


  // Plugin do CORS
  app.register(cors);

  // Plugin JWT
  app.register(fastifyJwt, {
    secret: 'supersecret'
  });

  // Registrando todas as Rotas
  const routes = [routesUsers, routesTask, routesCategory, routesRefreshToken, routesShared, routesNotification, routesPdf, routesNewpassword, routesSendEmail];

 routes.forEach(routes => {
  app.register(routes)
 })

const start = async () => {
  try {
    await app.listen({ port: PORT });
  } catch (err) {
    console.error('Ocorreu um erro ao iniciar o servidor:', err);
    process.exit(1);
  }
};

start();
