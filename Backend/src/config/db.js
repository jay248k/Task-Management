"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = exports.sql = void 0;
const serverless_1 = require("@neondatabase/serverless");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.sql = (0, serverless_1.neon)(process.env.DATABASE_URL);
const connectDB = async () => {
    try {
        await (0, exports.sql) `SELECT 1`;
        console.log("✅ Database Connected");
    }
    catch (error) {
        console.error("❌ Database Connection Failed:", error);
        process.exit(1);
    }
};
exports.connectDB = connectDB;
