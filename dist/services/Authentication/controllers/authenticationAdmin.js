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
exports.authenticationUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken")); // JSON Web Tokens are an open, industry standard method for representing claims securely between two parties.
const dotenv_1 = __importDefault(require("dotenv"));
const model_1 = __importDefault(require("../model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
dotenv_1.default.config(); // Load variables from file .env.
const authenticationUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Get username and password from request body
    const { username, password } = req.body;
    // Validate user input
    if (!username || !password) {
        return res.status(400).json({ message: 'All input is required' });
    }
    // Validate if user exist in our database
    const admin = yield model_1.default.findOne({ username });
    if (admin && (yield bcryptjs_1.default.compare(password, admin.password))) {
        // Create token
        const token = jsonwebtoken_1.default.sign({ username: username, password: password }, process.env.JWT_SECRET, {
            expiresIn: '7d', // Lifetime of token - 7 days from creating time
        });
        // Send token to user
        return res.status(200).json(token);
    }
    // Return an error response if the username or password is invalid
    return res.status(401).json({ message: 'Invalid username or password' });
});
exports.authenticationUser = authenticationUser;
//# sourceMappingURL=authenticationAdmin.js.map