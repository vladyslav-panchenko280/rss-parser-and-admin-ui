import PostsModel from '../model';

interface ReadRequest {
  params: {
    guid: string;
  };
}

interface Response {
  json: (data: any) => void;
  status: (code: number) => Response;
}

// Read post by id
const getPost = async (req: ReadRequest, res: Response) => {
  try {
    // Fetch the post by ID from the PostsModel collection
    const rss = await PostsModel.find({ guid: req.params.guid });

    // If the post is found, send it as JSON response
    if (rss) {
      res.json(rss);
    } else {
      // If the post is not found, send a 404 error response
      res.status(404).json({ error: 'Post not found' });
    }
  } catch (err) {
    // If an error occurs while fetching the post, send a 500 error response
    console.error('Failed to fetch RSS by id:', err);
    res.status(500).json({ error: 'Failed to fetch post by id' });
  }
};

export { getPost };
