import type { Request, Response } from "express";
import { config } from "../config.js";

export async function reset(_: Request, res: Response) {
  config.fileserverHits = 0;
  res.send("Server hits count reset");
}