import PostsModel, { Post } from '../model';
import type { Response } from '../..';
import { validatePostParams } from '../validators/validatePostParams';
import { validatePostStructure } from '../validators/validatePostStructure';

interface UpdateRequest {
  params: {
    guid: string;
  };
  body: Post;
}

// Update post by id
const updatePost = async (req: UpdateRequest, res: Response) => {
  // Validate structure of the post
  if (!(await validatePostStructure(req.body))) {
    return res.status(400).json({
      message:
        'Invalid post structure for updating. All inputs should be filled',
      data: req.body,
    });
  }

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
