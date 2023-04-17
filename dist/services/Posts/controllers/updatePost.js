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
// Update post by id
const updatePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Find the document by ID, update its contents, and return the updated document
        const updatedPost = yield model_1.default.findOneAndUpdate({ guid: req.params.guid }, // Filter to select the document by its guid
        req.body, // Update data to be applied
        { returnOriginal: false });
        // Return the updated document in the response
        if (updatedPost) {
            res.json(updatedPost);
        }
        else {
            res.status(404).json({ error: 'RSS not found' });
        }
    }
    catch (err) {
        // Handle any errors
        res.status(500).json({ error: err });
    }
});
exports.updatePost = updatePost;
//# sourceMappingURL=updatePost.js.map