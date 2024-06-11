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
import { injectSpeedInsights } from '@vercel/speed-insights';
import fastifyJwt from '@fastify/jwt';

const app = fastify({ logger: true });
const PORT = parseInt(`${process.env.PORT || 3333}`);

const configureServer = async () => {
  // Plugin do CORS
  await app.register(cors);

  // Plugin JWT
  await app.register(fastifyJwt, {
    secret: 'supersecret'
  });

  // Registrando todas as Rotas
  const routes = [routesUsers, routesTask, routesCategory, routesRefreshToken, routesShared, routesNotification, routesPdf, routesNewpassword, routesSendEmail];

  for (const route of routes) {
    await app.register(route);
  }

  app.setErrorHandler((error, request, reply) => {
    reply.code(400).send({ message: error.message });
  });
};

const start = async () => {
  try {
    await configureServer();
    await app.listen({ port: PORT });
    injectSpeedInsights();
  } catch (err) {
    console.error('Ocorreu um erro ao iniciar o servidor:', err);
    process.exit(1);
  }
};

start();
