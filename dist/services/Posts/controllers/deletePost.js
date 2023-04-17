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
        // Check if the document was found and deleted
        if (deletedPost) {
            // Return a deleted object in the response
            res.json(deletedPost);
        }
        else {
            // If the document was not found, return a 404 error
            res.status(404).json({ error: 'Post not found' });
        }
    }
    catch (err) {
        // Handle any errors that occur during the delete operation
        console.error('Failed to delete post by ID:', err);
        res.status(500).json({ error: 'Failed to delete post by ID' });
    }
});
exports.deletePost = deletePost;
//# sourceMappingURL=deletePost.js.map