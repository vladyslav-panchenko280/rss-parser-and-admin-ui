import PostsModel, { Post } from '../model';
import type { Response } from '../..';
import { validatePostStructure } from '../validators/validatePostStructure';

interface addRequest {
  body: Post;
}

// Add post to the database
const addPost = async (req: addRequest, res: Response): Promise<void> => {
  // Validate structure of post
  if (!(await validatePostStructure(req.body))) {
    return res.status(400).json({
      message:
        'Invalid post structure for inserting. All inputs should be filled',
      data: req.body,
    });
  }

  try {
    // Insert object model
    const newPost = await PostsModel.insertMany(req.body);
    res
      .status(200)
      .json({ message: 'Post has been successfully added', data: newPost });
  } catch (error: any) {
    res.status(500).json({ message: error.message, data: req.body });
  }
};

export { addPost };
