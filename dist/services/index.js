"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const routes_1 = __importDefault(require("./Authentication/routes"));
const routes_2 = __importDefault(require("./Posts/routes"));
const routes_3 = __importDefault(require("./RSSParser/routes"));
const router = (app) => {
    app.use('/api', routes_1.default);
    app.use('/api', routes_2.default);
    app.use('/api', routes_3.default);
};
exports.default = router;
//# sourceMappingURL=index.js.map