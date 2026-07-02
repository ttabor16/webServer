import { createUser } from "../db/queries/users.js";
import { respondWithJSON } from "./json.js";
import type { Request, Response } from "express";

export async function handlerUserCreate(req: Request, res: Response) {
    const { email } = req.body;

    const user = await createUser({email});

    if (!user) {
        throw new Error("User not found");
    }
    respondWithJSON( res, 201, {
        id: user.id,
        email: user.email,
        createdAt:user.createdAt,
        updatedAt:user.updatedAt,
    });

}