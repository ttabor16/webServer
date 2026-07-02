import { type Request, type Response } from "express";
import { config } from "../config.js";
import { deleteUsers } from "../db/queries/users.js";
import { respondWithError } from "./json.js";

export async function reset(_: Request, res: Response) {
  const platform = config.api.platform;
  if (platform != "dev") {
    respondWithError(res, 403, "Forbidden");
    return;
  };
  config.api.fileServerHits = 0;
  res.send("Server hits count reset");
  await deleteUsers();
}