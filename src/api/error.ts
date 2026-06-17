import type { NextFunction, Request, Response } from "express";
import { respondWithError} from "./json.js";

export function errorHandler( 
    err: Error, 
    req: Request, 
    res: Response, 
    next: NextFunction,
) {
    console.log(err);
    respondWithError(res, 500, "Something went wrong on our end");
};