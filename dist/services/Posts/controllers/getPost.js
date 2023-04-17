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
exports.getPost = void 0;
const model_1 = __importDefault(require("../model"));
// Read post by id
const getPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Fetch the post by ID from the PostsModel collection
        const rss = yield model_1.default.find({ guid: req.params.guid });
        // If the post is found, send it as JSON response
        if (rss) {
            res.json(rss);
        }
        else {
            // If the post is not found, send a 404 error response
            res.status(404).json({ error: 'Post not found' });
        }
    }
    catch (err) {
        // If an error occurs while fetching the post, send a 500 error response
        console.error('Failed to fetch RSS by id:', err);
        res.status(500).json({ error: 'Failed to fetch post by id' });
    }
});
exports.getPost = getPost;
//# sourceMappingURL=getPost.js.map