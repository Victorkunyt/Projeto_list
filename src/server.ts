import fastify from "fastify";
import cors from "@fastify/cors";
import { routesUsers } from "./routes/Users";
import { routesTask } from "./routes/Tasks";
import { routesCategory } from "./routes/Category";



const app = fastify({logger: false});
const PORT = parseInt(`${process.env.PORT || 3333}`);

// Plugin do CORS
//app.register(cors);

 const route = [routesUsers, routesTask, routesCategory,];

 // Registre cada categoria de rota
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
    console.log(`Server is running at ${PORT}`);
  } catch (err) {
    console.error('Ocorreu um erro ao iniciar o servidor:', err);
    process.exit(1);
  }
};

start();






// const routeCategories = [routesUsers, routesTasks, routesCategories, ...outrasCategorias];

// // Registre cada categoria de rota
// routeCategories.forEach(category => {
//   app.register(category);
// })