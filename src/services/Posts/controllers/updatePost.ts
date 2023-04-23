import PostsModel, { Post } from '../model';
import type { Response } from '../..';

interface UpdateRequest {
  params: {
    guid: string;
  };
  body: Post;
}

// Update post by id
const updatePost = async (req: UpdateRequest, res: Response) => {
  try {
    // Find the document by ID, update its contents, and return the updated document
    const updatedPost = await PostsModel.findOneAndUpdate(
      { guid: req.params.guid }, // Filter to select the document by its guid
      req.body, // Update data to be applied
      { returnOriginal: false }
    );
    res.json({
      message: 'Post has been successfully updated',
      data: updatedPost,
    });
  } catch (error: any) {
    // Handle any errors
    res.status(500).json({ message: error.message, data: {} });
  }
};

export { updatePost };
