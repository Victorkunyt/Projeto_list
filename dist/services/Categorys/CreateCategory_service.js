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
exports.CategoryService = void 0;
const client_1 = require("@prisma/client");
const CreateCategory_Validator_1 = require("../../validators/Category/CreateCategory_Validator");
class CategoryService {
    execute(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const prisma = new client_1.PrismaClient();
            (0, CreateCategory_Validator_1.CategoryCampos)(userData);
            const CategoryUsers = yield prisma.category.create({
                data: {
                    nameCategory: userData.nameCategory,
                    status: true,
                }
            });
            return CategoryUsers;
        });
    }
}
exports.CategoryService = CategoryService;
