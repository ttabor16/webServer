import type { Request, Response } from "express";

export async function validate_chirp(req: Request, res: Response) {
  let body = ""; // 1. Initialize

  // 2. Listen for data events
  req.on("data", (chunk) => {
    body += chunk;
  });

  // 3. Listen for end events
  req.on("end", () => {
    try {
        const parsedBody = JSON.parse(body);
        if (parsedBody.body.length > 140) {
            res.header("Content-Type", "application/json");
            res.status(400).send(JSON.stringify({ error: "Chirp is too long" }));
            return;
        }
        res.header("Content-Type", "application/json");
        res.status(200).send(JSON.stringify({ "valid": true }));
    } catch (error) {
      res.status(400).send("Invalid JSON");
    }
  });
}