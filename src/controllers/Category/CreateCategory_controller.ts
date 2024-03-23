import { FastifyRequest, FastifyReply } from "fastify";
import { CategoryService } from "../../services/Categorys/CreateCategory_service";
import { PayloadCategory } from "../../types/Category_types";
class CategoryCreateController {

    async handle(request: FastifyRequest, response: FastifyReply): Promise<void> {
   
            const userData = request.body as PayloadCategory; 
            const Category = new CategoryService();
            await Category.execute(userData);

            response.code(201).send({message: `Categoria criada com sucesso`});
}
    }


export { CategoryCreateController };
