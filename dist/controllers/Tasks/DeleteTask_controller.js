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
exports.TaskDeleteController = void 0;
const DeleteTask_service_1 = require("../../services/Tasks/DeleteTask_service");
class TaskDeleteController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const userData = request.query;
            const DeleteTaskUsers = new DeleteTask_service_1.DeleteTaskService();
            yield DeleteTaskUsers.execute(userData);
            response.code(204);
        });
    }
}
exports.TaskDeleteController = TaskDeleteController;
