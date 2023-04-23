"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseRSS = void 0;
const rss_parser_1 = __importDefault(require("rss-parser"));
const model_1 = __importDefault(require("../../Posts/model"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // Load variables from file .env.
const parser = new rss_parser_1.default();
// Parse RSS feed and save to database
const parseRSS = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield parser.parseURL(process.env.RSS_FEED, (err, feed) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                // Return an error response if parsing was failed
                return res.json({ message: err.message, data: {} });
            }
            else {
                // Get items from parsed feed
                const { items } = feed;
                // Add to database new posts
                yield model_1.default.insertMany(items.reverse(), {
                    ordered: false,
                }).catch((err) => {
                    console.error(`Prevent dublicates: ${err.writeErrors.length}, Objects was added to database: ${51 - err.writeErrors.length}`);
                });
                return res.json({
                    message: 'RSS Feed have been already parsed and pull to the database',
                    data: items,
                });
            }
        }));
    }
    catch (error) {
        console.error(error);
    }
});
exports.parseRSS = parseRSS;
//# sourceMappingURL=ParseRSS.js.map