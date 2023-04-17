import PostsModel from '../model';
import { Post } from '../interface';

interface UpdateRequest {
  params: {
    guid: string;
  };
  body: Post;
}

interface Response {
  json: (data: any) => void;
  status: (code: number) => Response;
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

    // Return the updated document in the response
    if (updatedPost) {
      res.json(updatedPost);
    } else {
      res.status(404).json({ error: 'RSS not found' });
    }
  } catch (err) {
    // Handle any errors
    res.status(500).json({ error: err });
  }
};

export { updatePost };
