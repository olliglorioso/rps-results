import { AxiosError } from "axios";
import { NextFunction, Request, Response } from "express";

const errorHandler = (error: AxiosError, _req: Request, res: Response, _next: NextFunction) => {
    if (error.name === "ServerError") {
        res.status(500).json({
            error: error.message,
            stack: error.stack
        });
    }
    if (error.name === "UserInputError") {
        res.status(400).json({
            error: error.message,
            stack: error.stack
        });
    }
};

export default errorHandler;