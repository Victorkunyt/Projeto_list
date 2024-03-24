import { FastifyRequest,FastifyReply } from "fastify";
import { GetCategoryService } from "../../services/Categorys/GetCategory_service";
import { TasksTypes } from "../../types/Task_types";




class GetCategoryController {

async handle(request: FastifyRequest, response: FastifyReply): Promise<void>  {
    const userData =  request.query as TasksTypes
    const Category = new GetCategoryService();
    const returnCategorys = await Category.execute(userData);

    return response.send(returnCategorys)

}

}

export {GetCategoryController}