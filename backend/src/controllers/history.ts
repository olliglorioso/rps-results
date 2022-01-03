import express from "express";
import historyFetch from "../apiRequests/historyFetch";
import { parseCursor } from "../typescript/typeGuards";

// This file handles all the requests to the /api/history endpoint.
// Initializing express router.
const router = express.Router();

// If the endpoint is /api/history, the request is handled by this function. This function
// simply calls the historyFetch function from apiRequests and returns the result.
// HistoryFetch is a function that fetches the bad-api, edits the result and returns a promise of the result.
// Returns the data + cursor to the frontend, so that the frontend can fetch the next page.
router.get("/", (_req, res, next) => {
    historyFetch()
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
    const parsedCursor = parseCursor(req.query.cursor);
    historyFetch(parsedCursor)
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            next(err);
        });
});

export default router;