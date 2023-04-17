import AuthRouter from './Authentication/routes';
import PostsRouter from './Posts/routes';
import RSSParserRouter from './RSSParser/routes';
import { Express } from 'express';

const router = (app: Express) => {
  app.use('/api', AuthRouter);
  app.use('/api', PostsRouter);
  app.use('/api', RSSParserRouter);
};

export default router;
