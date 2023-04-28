"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken")); // JSON Web Tokens are an open, industry standard method for representing claims securely between two parties.
const dotenv_1 = __importDefault(require("dotenv"));
const checkExistenceOfToken_1 = require("../validators/checkExistenceOfToken");
const varifyTypeOfToken_1 = require("../validators/varifyTypeOfToken");
dotenv_1.default.config(); // Load variables from file .env.
// Create middleware for authentication
const verifyToken = (req, res, next) => {
    // Check if token exist in headers
    if (!(0, checkExistenceOfToken_1.checkExistenceOfToken)(req.headers['x-access-token'])) {
        return res.status(400).json({
            message: 'A token is required for authentication',
            data: req.headers['x-access-token'],
        });
    }
    const token = req.headers['x-access-token'];
    // Check type of token
    if (!(0, varifyTypeOfToken_1.varifyTypeOfToken)(token, 'string')) {
        return res
            .status(401)
            .json({ message: 'Invalid type of token', data: token });
    }
    try {
        // Verify and pass request
        jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
    }
    catch (err) {
        return res.status(401).json({ message: 'Invalid Token', data: token });
    }
    return next();
};
exports.verifyToken = verifyToken;
//# sourceMappingURL=varifyToken.js.map