"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express")); // Fast, unopinionated, minimalist web framework for Node.js.
const services_1 = __importDefault(require("./services")); // Takes our Router
const body_parser_1 = __importDefault(require("body-parser")); // Node.js body parsing middleware.
const cors_1 = __importDefault(require("cors")); //
const connect_1 = require("./database/connect");
dotenv_1.default.config(); // Load variables from file .env.
const app = (0, express_1.default)(); // Create an Express application.
(0, connect_1.connectToDatabase)(); // Connect to MongoDB database
// Middleware
app.options('*', (0, cors_1.default)());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    next();
});
app.use(body_parser_1.default.json()); // for parsing application/json
app.use(body_parser_1.default.urlencoded({ extended: true }));
(0, services_1.default)(app);
const port = process.env.PORT || 3000;
// A node http.Server is returned, with this application (which is a Function) as its callback.
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
//# sourceMappingURL=index.js.map