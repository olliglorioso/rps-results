"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const historyFetch_1 = __importDefault(require("../apiRequests/historyFetch"));
const typeGuards_1 = require("../typescript/typeGuards");
// This file handles all the requests to the /api/history endpoint.
// Initializing express router.
const router = express_1.default.Router();
// If the endpoint is /api/history, the request is handled by this function. This function
// simply calls the historyFetch function from apiRequests and returns the result.
// HistoryFetch is a function that fetches the bad-api, edits the result and returns a promise of the result.
// Returns the data + cursor to the frontend, so that the frontend can fetch the next page.
router.get("/", (_req, res, next) => {
    (0, historyFetch_1.default)()
        .then(result => {
        res.status(200).json(result);
    })
        .catch(err => {
        next(err);
    });
});
// If the endpoint is api/history/more, the request is handled by this function. This function
// simply calls the historyFetch function from apiRequests and returns the result. Frontend must provide
// a cursor to fetch more results.
router.get("/more", (req, res, next) => {
    // Using parsedCursor to ensure that the cursor sent from the frontend is a string.
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
