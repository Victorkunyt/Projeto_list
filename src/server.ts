import fastify from "fastify";
import cors from "@fastify/cors";
import { routesUsers } from "./routes/Users";
import { routesTask } from "./routes/Tasks";



const app = fastify({logger: false})
const PORT = parseInt(`${process.env.PORT || 3333}`)

app.register(require('@fastify/jwt'), {
  secret: 'supersecret'
})

app.setErrorHandler((error, request, reply) => {

      reply.code(400).send({message : error.message})
    
  });
const start = async () => {

    await app.register(cors)
    await app.register(routesUsers,routesTask)
    try {
      await app.listen({ port: PORT }, () => console.log(`Server is running at ${PORT}`));
  } catch (err) {
      console.error('Ocorreu um erro ao iniciar o servidor:', err);
      process.exit(1);
  }
  

} 

start();