import { FastifyRequest,FastifyReply } from "fastify";
import { GetCategoryService } from "../../services/Categorys/GetCategory_service";



class GetCategoryController {

async handle(request: FastifyRequest, response: FastifyReply): Promise<void>  {

    const Category = new GetCategoryService();
    const returnCategorys = await Category.execute();

    return response.send(returnCategorys)

}

}

export {GetCategoryController}