"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authenticationAdmin_1 = require("./controllers/authenticationAdmin");
const express_1 = require("express");
const AuthRouter = (0, express_1.Router)();
AuthRouter.route('/login').post(authenticationAdmin_1.authenticationUser);
exports.default = AuthRouter;
//# sourceMappingURL=routes.js.map