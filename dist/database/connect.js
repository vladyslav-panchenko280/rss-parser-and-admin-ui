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
exports.connectToDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // Load variables from file .env.
const connectToDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        mongoose_1.default.connection.on('connecting', () => {
            console.log(`MongoDB: connecting.`);
        });
        mongoose_1.default.connection.on('connected', () => {
            console.log('MongoDB: connected.');
        });
        mongoose_1.default.connection.on('disconnecting', () => {
            console.log('MongoDB: disconnecting.');
        });
        mongoose_1.default.connection.on('disconnected', () => {
            console.log('MongoDB: disconnected.');
        });
        if (mongoose_1.default.connection.readyState !== 1 &&
            mongoose_1.default.connection.readyState !== 2) {
            yield mongoose_1.default.connect(process.env.DATABASE_MONGO);
        }
    }
    catch (error) {
        console.error('Error connecting to MongoDB: ', error.message);
    }
});
exports.connectToDatabase = connectToDatabase;
//# sourceMappingURL=connect.js.map