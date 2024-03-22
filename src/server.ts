import fastify from "fastify";
import cors from "@fastify/cors";
import { routes } from "./routes/CreateUsers";


const app = fastify({logger: true})
const PORT = parseInt(`${process.env.PORT || 3333}`)

app.register(require('@fastify/jwt'), {
  secret: 'supersecret'
})

app.setErrorHandler((error, request, reply) => {

      reply.code(400).send({message : error.message})
    
  });
const start = async () => {

    await app.register(cors)
    await app.register(routes)
    try {
      await app.listen({ port: PORT }, () => console.log(`Server is running at ${PORT}`));
  } catch (err) {
      console.error('Ocorreu um erro ao iniciar o servidor:', err);
      process.exit(1);
  }
  

} 

start();