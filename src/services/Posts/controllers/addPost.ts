import { Post } from '../interface';
import PostsModel from '../model';

interface addRequest {
  body: Post;
}

interface Response {
  json: (data: any) => void;
  status: (code: number) => Response;
}

// Add post to the database
const addPost = async (req: addRequest, res: Response) => {
  try {
    // Insert object model
    const newPost = await PostsModel.insertMany(req.body);
    res.json(newPost);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export { addPost };
