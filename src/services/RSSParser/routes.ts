import { Router } from 'express';
import { parseRSS } from './controllers/ParseRSS';

const RSSParserRouter = Router();

RSSParserRouter.route('/rssParse').get(parseRSS);

export default RSSParserRouter;
