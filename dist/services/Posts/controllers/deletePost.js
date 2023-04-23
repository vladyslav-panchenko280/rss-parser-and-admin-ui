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
exports.deletePost = void 0;
const model_1 = __importDefault(require("../model"));
// Delete by ID
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Find the document by ID and delete it
        const deletedPost = yield model_1.default.deleteMany({ guid: req.params.guid });
        res.json({
            message: 'Post has been successfully deleted',
            data: deletedPost,
        });
    }
    catch (error) {
        // Handle any errors that occur during the delete operation
        res
            .status(500)
            .json({ message: 'Failed to delete post by ID', data: req.params.guid });
    }
});
exports.deletePost = deletePost;
//# sourceMappingURL=deletePost.js.map