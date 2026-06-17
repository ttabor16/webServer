import type { Request, Response, NextFunction } from "express";
import { respondWithError, respondWithJSON } from "./json.js";

export async function validate_chirp(req: Request, res: Response, next: NextFunction) {
  type parameters = {
    body: string;
  };

  const params: parameters = req.body;

  const maxChirpLength = 140;

  if (params.body.length > maxChirpLength) {
    throw new Error("Chirp is too long");
  }

  const words = params.body.split(" ");
  const badWords: string[] = ["kerfuffle", "sharbert", "fornax"];
  const cleanWords: string[] = [];

  for(let word of words) {
    if (badWords.includes(word.toLowerCase())) {
      cleanWords.push("****");
      continue;
    }
    cleanWords.push(word);
  }

  respondWithJSON(res, 200, {
    cleanedBody: cleanWords.join(" ")
  });}