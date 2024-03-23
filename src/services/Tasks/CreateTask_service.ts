import { PrismaClient } from "@prisma/client";
import {TasksTypes} from "../../types/Task_types";
import { TaskCampos } from "../../validators/Task/TaskValidator";

class TaskService {

    async execute(userData: TasksTypes) {
        const prisma = new PrismaClient();

        TaskCampos(userData)
        
        const taskUsers = await prisma.task.create({
            data: {
               nametask: userData.nametask,
               status: true,
            }
            
        });

        return taskUsers
    }
}

export { TaskService };
