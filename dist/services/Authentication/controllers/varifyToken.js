"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken")); // JSON Web Tokens are an open, industry standard method for representing claims securely between two parties.
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // Load variables from file .env.
// Create middleware for authentication
const verifyToken = (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) {
        return res
            .status(403)
            .json({ message: 'A token is required for authentication', data: token });
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