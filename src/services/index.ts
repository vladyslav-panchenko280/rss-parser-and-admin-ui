import AuthRouter from './Authentication/routes';
import PostsRouter from './Posts/routes';
import RSSParserRouter from './RSSParser/routes';
import { Express } from 'express';

export interface Response {
  json: ({ message, data }: { message: string; data: any }) => void;
  status: (code: number) => Response;
}

const router = (app: Express) => {
  app.use('/api', AuthRouter);
  app.use('/api', PostsRouter);
  app.use('/api', RSSParserRouter);
};

export default router;
