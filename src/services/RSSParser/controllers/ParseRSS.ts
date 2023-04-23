import Parser from 'rss-parser';
import PostsModel from '../../Posts/model';
import type { Response } from '../..';
import dotenv from 'dotenv';

dotenv.config(); // Load variables from file .env.

const parser = new Parser();

// Parse RSS feed and save to database
const parseRSS = async (req: any, res: Response) => {
  try {
    return await parser.parseURL(
      process.env.RSS_FEED as string,
      async (err: any, feed) => {
        if (err) {
          // Return an error response if parsing was failed
          return res.json({ message: err.message, data: {} });
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

          return res.json({
            message:
              'RSS Feed have been already parsed and pull to the database',
            data: items,
          });
        }
      }
    );
  } catch (error) {
    console.error(error);
  }
};

export { parseRSS };
