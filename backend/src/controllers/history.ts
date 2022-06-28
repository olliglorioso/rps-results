import express from "express";
import historyFetch from "../apiRequests/historyFetch";
import { parseCursor } from "../typescript/typeGuards";

const router = express.Router();

router.get("/", (_req, res, next) => {
    historyFetch()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            next(err);
        });
});

router.get("/more", (req, res, next) => {
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