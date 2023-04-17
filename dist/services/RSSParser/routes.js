"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ParseRSS_1 = require("./controllers/ParseRSS");
const RSSParserRouter = (0, express_1.Router)();
RSSParserRouter.route('/rssParse').get(ParseRSS_1.parseRSS);
exports.default = RSSParserRouter;
//# sourceMappingURL=routes.js.map