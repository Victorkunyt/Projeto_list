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
exports.routesCategory = void 0;
const CreateCategory_controller_1 = require("../controllers/Category/CreateCategory_controller");
const GetCategory_controller_1 = require("../controllers/Category/GetCategory_controller");
function routesCategory(fastify, options) {
    return __awaiter(this, void 0, void 0, function* () {
        fastify.post("/registerCategory", (request, reply) => __awaiter(this, void 0, void 0, function* () {
            return new CreateCategory_controller_1.CategoryCreateController().handle(request, reply);
        }));
        fastify.get("/category", (request, reply) => __awaiter(this, void 0, void 0, function* () {
            return new GetCategory_controller_1.GetCategoryController().handle(request, reply);
        }));
    });
}
exports.routesCategory = routesCategory;
