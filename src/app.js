"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const history_1 = __importDefault(require("./controllers/history"));
const cors_1 = __importDefault(require("cors"));
const errorHandler_1 = __importDefault(require("./utils/errorHandler"));
// The express-server is initialized and a couple of middlewares are applied.
const app = (0, express_1.default)();
// Cors is used to allow cross-origin requests.
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.static("build"));
app.use("/api/history", history_1.default);
app.use(errorHandler_1.default);
exports.default = app;
