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
exports.getAllPosts = void 0;
const model_1 = __importDefault(require("../model"));
const validateValue = (filterValue, filterOption) => {
    if (filterValue)
        return { [filterOption]: { $regex: filterValue, $options: 'i' } };
    else
        return {};
};
// Parse and return feed
const getAllPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const totalPosts = yield model_1.default.countDocuments(validateValue(filterValue, filterOption));
        const totalPages = Math.ceil(totalPosts / pageSize); // Calculate total count of pages
        // Our algorithm of getting posts on database side.
        const data = yield model_1.default
            // We filter by regexp if we get anything from req.query.filterValue. If no, we find all posts
            .find(validateValue(filterValue, filterOption))
            // Sort posts by sortOptions and orders
            .sort({ [sortOption]: sortOrder })
            // Pagination options
            .skip(startIndex)
            // Limit page
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
        return res.json({
            message: 'Posts have been successfully found',
            data: { info, data },
        });
    }
    catch (error) {
        return res.json({ message: error.message, data: {} });
    }
});
exports.getAllPosts = getAllPosts;
//# sourceMappingURL=getAllPosts.js.map