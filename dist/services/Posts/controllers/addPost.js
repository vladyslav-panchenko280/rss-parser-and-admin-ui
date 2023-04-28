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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addPost = void 0;
const model_1 = __importDefault(require("../model"));
const validatePostStructure_1 = require("../validators/validatePostStructure");
// Add post to the database
const addPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Validate structure of post
    if (!(yield (0, validatePostStructure_1.validatePostStructure)(req.body))) {
        return res.status(400).json({
            message: 'Invalid post structure for inserting. All inputs should be filled',
            data: req.body,
        });
    }
    try {
        // Insert object model
        const newPost = yield model_1.default.insertMany(req.body);
        res
            .status(200)
            .json({ message: 'Post has been successfully added', data: newPost });
    }
    catch (error) {
        res.status(500).json({ message: error.message, data: req.body });
    }
});
exports.addPost = addPost;
//# sourceMappingURL=addPost.js.map