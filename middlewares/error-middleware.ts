import { ResponseError } from "../error/response-error";
import { NextFunction, Request, Response } from "express";

export const errorMiddleware = async (error: Error, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof ResponseError) {
        res.status(error.status).json({ message: error.message });
    } else {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}