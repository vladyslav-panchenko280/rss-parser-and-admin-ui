import Parser from 'rss-parser';
import PostsModel from '../../Posts/model';

interface Response {
  json: (data: any) => void;
  status: (code: number) => Response;
}

const parser = new Parser();

// Parse RSS feed and save to database
const parseRSS = async (req: any, res: Response) => {
  try {
    return await parser.parseURL(
      'https://lifehacker.com/rss',
      async (err, feed) => {
        if (err) {
          // Return an error response if parsing was failed
          return res.json({ err });
        } else {
          // Get items from parsed feed
          const { items } = feed;

          // Add to database new posts
          await PostsModel.insertMany(items.reverse(), {
            ordered: false,
          }).catch((err) => {
            console.error(
              `Prevent dublicates: ${
                err.writeErrors.length
              }, Objects was added to database: ${51 - err.writeErrors.length}`
            );
          });

          return res.json(
            'RSS Feed have been already parsed and pull to the database'
          );
        }
      }
    );
  } catch (error) {
    console.error(error);
  }
};

export { parseRSS };
