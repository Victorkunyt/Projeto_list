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
exports.routesTask = void 0;
const CreateTask_controller_1 = require("../controllers/Tasks/CreateTask_controller");
const GetAllTask_controller_1 = require("../controllers/Tasks/GetAllTask_controller");
const PutTaskController_1 = require("../controllers/Tasks/PutTaskController");
const DeleteTask_controller_1 = require("../controllers/Tasks/DeleteTask_controller");
function routesTask(fastify, options) {
    return __awaiter(this, void 0, void 0, function* () {
        fastify.post("/registerTask", (request, reply) => __awaiter(this, void 0, void 0, function* () {
            return new CreateTask_controller_1.TaskCreateController().handle(request, reply);
        }));
        fastify.get("/getAlltask", (request, reply) => __awaiter(this, void 0, void 0, function* () {
            return new GetAllTask_controller_1.TaskGetAllController().handle(request, reply);
        }));
        fastify.put("/putTask", (request, reply) => __awaiter(this, void 0, void 0, function* () {
            return new PutTaskController_1.TaskUpdateController().handle(request, reply);
        }));
        fastify.delete("/deleteTask", (request, reply) => __awaiter(this, void 0, void 0, function* () {
            return new DeleteTask_controller_1.TaskDeleteController().handle(request, reply);
        }));
    });
}
exports.routesTask = routesTask;
