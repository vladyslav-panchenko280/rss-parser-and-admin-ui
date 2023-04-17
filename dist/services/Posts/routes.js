"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const addPost_1 = require("./controllers/addPost");
const updatePost_1 = require("./controllers/updatePost");
const deletePost_1 = require("./controllers/deletePost");
const getPost_1 = require("./controllers/getPost");
const getAllPosts_1 = require("./controllers/getAllPosts");
const varifyToken_1 = require("../Authentication/controllers/varifyToken");
const PostsRouter = (0, express_1.Router)();
PostsRouter.route('/posts')
    .post(varifyToken_1.verifyToken, addPost_1.addPost)
    .get(varifyToken_1.verifyToken, getAllPosts_1.getAllPosts);
PostsRouter.route('/posts/:guid')
    .put(varifyToken_1.verifyToken, updatePost_1.updatePost)
    .delete(varifyToken_1.verifyToken, deletePost_1.deletePost)
    .get(varifyToken_1.verifyToken, getPost_1.getPost);
exports.default = PostsRouter;
//# sourceMappingURL=routes.js.map