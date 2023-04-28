import PostsModel from '../model';
import type { Response } from '../..';
import type { getPostById } from '../routes';
import { validatePostParams } from '../validators/validatePostParams';

// Read post by id
const getPost = async (req: getPostById, res: Response): Promise<void> => {
  // Validate params of the post
  if (!(await validatePostParams(req.params))) {
    return res.status(400).json({ message: 'Invalid guid', data: req.params });
  }

  try {
    // Fetch the post by ID from the PostsModel collection
    const post = await PostsModel.find({ guid: req.params.guid });
    res.json({ message: 'Post has been successfully found', data: post });
  } catch (error) {
    // If an error occurs while fetching the post, send a 500 error response
    res
      .status(500)
      .json({ message: 'Failed to fetch post by id', data: req.params.guid });
  }
};

export { getPost };
