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
const checkAuthBody_1 = require("../validators/checkAuthBody");
const varifyEncryptedPassword_1 = require("../validators/varifyEncryptedPassword");
dotenv_1.default.config(); // Load variables from file .env.
const authenticationUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Get username and password from request body
    const { username } = req.body;
    // Validate user input
    if (!(yield (0, checkAuthBody_1.checkAuthBody)(req.body))) {
        return res
            .status(400)
            .json({ message: 'All input is required', data: req.body });
    }
    // Validate if user exist in our database
    const admin = yield model_1.default.findOne({ username });
    if (admin &&
        (yield (0, varifyEncryptedPassword_1.varifyEncryptedPassword)(req.body.password, admin.password))) {
        // Create token
        const token = jsonwebtoken_1.default.sign(req.body, process.env.JWT_SECRET, {
            expiresIn: '1d', // Lifetime of token - 1 day from creating time
        });
        // Send token to user
        return res
            .status(200)
            .json({ message: 'Token has been successfully gotten', data: token });
    }
    // Return an error response if the username or password is invalid
    return res
        .status(401)
        .json({ message: 'Invalid username or password', data: req.body });
});
exports.authenticationUser = authenticationUser;
//# sourceMappingURL=authenticationAdmin.js.map