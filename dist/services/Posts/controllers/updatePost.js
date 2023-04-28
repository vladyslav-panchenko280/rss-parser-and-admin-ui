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
exports.updatePost = void 0;
const model_1 = __importDefault(require("../model"));
const validatePostStructure_1 = require("../validators/validatePostStructure");
// Update post by id
const updatePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Validate structure of the post
    if (!(yield (0, validatePostStructure_1.validatePostStructure)(req.body))) {
        return res.status(400).json({
            message: 'Invalid post structure for updating. All inputs should be filled',
            data: req.body,
        });
    }
    try {
        // Find the document by ID, update its contents, and return the updated document
        const updatedPost = yield model_1.default.findOneAndUpdate({ guid: req.params.guid }, // Filter to select the document by its guid
        req.body, // Update data to be applied
        { returnOriginal: false });
        res.json({
            message: 'Post has been successfully updated',
            data: updatedPost,
        });
    }
    catch (error) {
        // Handle any errors
        res.status(500).json({ message: error.message, data: {} });
    }
});
exports.updatePost = updatePost;
//# sourceMappingURL=updatePost.js.map