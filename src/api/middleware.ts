import {Request, Response, NextFunction} from "express";
import { respondWithError } from "./json.js";
import { config } from "../config.js";
import { BadRequestError, ForbiddenError, NotFoundError, UnauthorizedError } from "./error.js";

export function middlewareLogResponses(req: Request, res: Response, next: NextFunction): void {
    res.on("finish", () => {
        if (res.statusCode >= 300) {
            console.log(`[NON-OK] ${req.method} ${req.url} - Status: ${res.statusCode}`);
        }
});
next();
};

export function middlewareMetricsInc(req: Request, res: Response, next: NextFunction) {
    config.api.fileServerHits ++;
    next();
}

export function errorHandler( 
    err: Error, 
    req: Request, 
    res: Response, 
    next: NextFunction,
) {
    if (err instanceof BadRequestError) {
        respondWithError(res, 400, err.message);
    } else if (err instanceof UnauthorizedError) {
        respondWithError(res, 401, err.message);
    } else if (err instanceof ForbiddenError) {
        respondWithError(res, 403, err.message);
    } else if (err instanceof NotFoundError) {
        respondWithError(res, 404, err.message);
    } else {
        console.log(err);
        respondWithError(res, 500, "Something went wrong on our end")
    }
};