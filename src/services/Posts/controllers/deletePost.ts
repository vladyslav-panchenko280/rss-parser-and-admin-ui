import PostsModel from '../model';

interface DeleteRequest {
  params: {
    guid: string;
  };
}

interface Response {
  json: (data: any) => void;
  status: (code: number) => Response;
}

// Delete by ID
const deletePost = async (req: DeleteRequest, res: Response) => {
  try {
    // Find the document by ID and delete it
    const deletedPost = await PostsModel.deleteMany({ guid: req.params.guid });

    // Check if the document was found and deleted
    if (deletedPost) {
      // Return a deleted object in the response
      res.json(deletedPost);
    } else {
      // If the document was not found, return a 404 error
      res.status(404).json({ error: 'Post not found' });
    }
  } catch (err) {
    // Handle any errors that occur during the delete operation
    console.error('Failed to delete post by ID:', err);
    res.status(500).json({ error: 'Failed to delete post by ID' });
  }
};

export { deletePost };
