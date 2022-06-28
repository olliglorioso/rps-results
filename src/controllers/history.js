"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const historyFetch_1 = __importDefault(require("../apiRequests/historyFetch"));
const typeGuards_1 = require("../typescript/typeGuards");
const router = express_1.default.Router();
router.get("/", (_req, res, next) => {
    (0, historyFetch_1.default)()
        .then(result => {
        res.status(200).json(result);
    })
        .catch(err => {
        next(err);
    });
});
router.get("/more", (req, res, next) => {
    const parsedCursor = (0, typeGuards_1.parseCursor)(req.query.cursor);
    (0, historyFetch_1.default)(parsedCursor)
        .then(result => {
        res.status(200).json(result);
    })
        .catch(err => {
        next(err);
    });
});
exports.default = router;
