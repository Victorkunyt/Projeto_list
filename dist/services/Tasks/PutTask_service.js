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
exports.PutTaskService = void 0;
const client_1 = require("@prisma/client");
const TaskIdValidator_1 = require("../../validators/Task/TaskIdValidator");
const TaskValidator_1 = require("../../validators/Task/TaskValidator");
class PutTaskService {
    execute(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const prisma = new client_1.PrismaClient();
            (0, TaskValidator_1.TaskCampos)(userData);
            (0, TaskIdValidator_1.TaskID)(userData);
            const findId = yield prisma.task.findFirst({
                where: {
                    id: userData.userId,
                },
            });
            if (!findId) {
                throw new Error("Id não existe na base de dados");
            }
            const PuttaskUsers = yield prisma.task.update({
                where: {
                    id: userData.userId,
                },
                data: {
                    nametask: userData.nametask,
                    status: true,
                },
            });
            return PuttaskUsers;
        });
    }
}
exports.PutTaskService = PutTaskService;
