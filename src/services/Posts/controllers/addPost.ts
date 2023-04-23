import PostsModel, { Post } from '../model';
import type { Response } from '../..';

interface addRequest {
  body: Post;
}

// Add post to the database
const addPost = async (req: addRequest, res: Response): Promise<void> => {
  try {
    // Insert object model
    const newPost = await PostsModel.insertMany(req.body);
    res.json({ message: 'Post has been successfully added', data: newPost });
  } catch (error: any) {
    res.status(500).json({ message: error.message, data: req.body });
  }
};

export { addPost };
