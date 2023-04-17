import PostsModel from '../model';

type SortOption = 'isoDate' | 'creator' | 'title';
type SortOrder = 1 | -1;
type FilterOption = 'pubDate' | 'creator' | 'categories' | 'title';
type FilterValue = string | string[];

interface GetFeedRequest {
  query: {
    page: string;
    filterBy: FilterOption;
    sortBy: SortOption;
    filterValue: FilterValue;
    sortOrder: SortOrder;
  };
}

interface Response {
  json: (data: any) => void;
  status: (code: number) => Response;
}

// Parse and return feed
const getAllPosts = async (req: GetFeedRequest, res: Response) => {
  try {
    // Implementation of pagination. We start from 1 page and have 10 items limit per page
    const pageSize = 10; // Count of posts per page
    const currentPage = parseInt(req.query.page) || 1; // Current page, which we have gotten from user
    const startIndex = (currentPage - 1) * pageSize; // From which item starts page

    // Sorting options. There are 3 options: 'alphabeticallyName', 'isoDate', 'alphabeticallyTitle'
    const sortOption = req.query.sortBy || 'isoDate';

    // Sorting order. There are 2 options: -1, 1
    const sortOrder = req.query.sortOrder || 1;

    // Filter options. There are 4 options: 'title', 'name', 'date', 'categories'
    const filterOption = req.query.filterBy || 'creator';

    // Filter value. By default it is ''
    const filterValue = req.query.filterValue || '';

    // Get total count of all Posts
    const totalPosts = await PostsModel.countDocuments(
      filterValue
        ? { [filterOption]: { $regex: filterValue, $options: 'i' } }
        : {}
    );
    const totalPages = Math.ceil(totalPosts / pageSize); // Calculate total count of pages

    // Our algorithm of getting posts on database side.
    const data = await PostsModel
      // We filter by regexp if we get anything from req.query.filterValue. If no, we find all posts
      .find(
        filterValue !== ''
          ? { [filterOption]: { $regex: filterValue, $options: 'i' } }
          : {}
      )
      // Sort posts by sortOptions and orders
      .sort({ [sortOption]: sortOrder })
      // Pagination options
      .skip(startIndex)
      .limit(pageSize)
      .exec();

    // All statistic information
    const info = {
      currentPage,
      totalPosts,
      pageSize,
      startIndex,
      totalPages,
    };

    // Return paginated posts to the client
    return res.json({ info, data });
  } catch (err) {
    // Return an error response if parsing was failed
    return res.json({ err });
  }
};

export { getAllPosts };
