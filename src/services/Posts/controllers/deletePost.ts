import PostsModel from '../model';
import type { Response } from '../..';
import type { getPostById } from '../routes';
import { validatePostParams } from '../validators/validatePostParams';

// Delete by ID
const deletePost = async (req: getPostById, res: Response): Promise<void> => {
  // Validate params of the post
  if (!(await validatePostParams(req.params))) {
    return res
      .status(400)
      .json({ message: 'Invalid guid for deletion', data: req.params });
  }

  try {
    // Find the document by ID and delete it
    const deletedPost = await PostsModel.deleteMany({ guid: req.params.guid });
    res.json({
      message: 'Post has been successfully deleted',
      data: deletedPost,
    });
  } catch (error) {
    // Handle any errors that occur during the delete operation
    res
      .status(500)
      .json({ message: 'Failed to delete post by ID', data: req.params.guid });
  }
};

export { deletePost };
