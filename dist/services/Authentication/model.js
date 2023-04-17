"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// JSON Schema for admins
const AdminSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});
const AdminModel = mongoose_1.default.model('Admin', AdminSchema, 'adminsJWT');
exports.default = AdminModel;
//# sourceMappingURL=model.js.map