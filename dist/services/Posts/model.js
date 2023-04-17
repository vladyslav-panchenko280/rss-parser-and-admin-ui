"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// JSON Schema for admins
const PostSchema = new mongoose_1.default.Schema({
    creator: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
    pubDate: {
        type: String,
        unique: true,
        required: true,
    },
    'dc:creator': {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    contentSnippet: {
        type: String,
        required: true,
    },
    guid: {
        type: String,
        unique: true,
    },
    categories: {
        type: [String],
        required: true,
    },
    isoDate: {
        type: String,
        required: true,
    },
});
const PostsModel = mongoose_1.default.model('Posts', PostSchema);
exports.default = PostsModel;
//# sourceMappingURL=model.js.map