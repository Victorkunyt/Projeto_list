"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskService = void 0;
const client_1 = require("@prisma/client");
const TaskValidator_1 = require("../../validators/Task/TaskValidator");
const TaskIdValidator_1 = require("../../validators/Task/TaskIdValidator");
class TaskService {
    execute(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const prisma = new client_1.PrismaClient();
            (0, TaskValidator_1.TaskCampos)(userData);
            (0, TaskIdValidator_1.TaskID)(userData);
            const ValidationComponente = yield prisma.user.findFirst({
                where: {
                    id: userData.userId,
                },
            });
            if (!ValidationComponente) {
                throw new Error("User Id de usuario inválido");
            }
            const ValidationCategoryid = yield prisma.category.findFirst({
                where: {
                    id: userData.categoryId,
                },
            });
            if (!ValidationCategoryid) {
                throw new Error("Category da task inválido");
            }
            const taskUsers = yield prisma.task.create({
                data: {
                    nametask: userData.nametask,
                    categoryId: userData.categoryId,
                    userId: userData.userId,
                    status: true,
                },
            });
            return taskUsers;
        });
    }
}
exports.TaskService = TaskService;
