import { Router } from 'express';
import { addPost } from './controllers/addPost';
import { updatePost } from './controllers/updatePost';
import { deletePost } from './controllers/deletePost';
import { getPost } from './controllers/getPost';
import { getAllPosts } from './controllers/getAllPosts';
import { verifyToken } from '../Authentication/controllers/varifyToken';

export interface getPostById {
  params: {
    guid: string;
  };
}

const PostsRouter = Router();

PostsRouter.route('/posts')
  .post(verifyToken, addPost)
  .get(verifyToken, getAllPosts);

PostsRouter.route('/posts/:guid')
  .put(verifyToken, updatePost)
  .delete(verifyToken, deletePost)
  .get(verifyToken, getPost);

export default PostsRouter;
