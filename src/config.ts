process.loadEnvFile()

export type APIConfig = {
  fileserverHits: number;
  dbURL:string;
};

export function envOrThrow(key: string): string{
  const db = process.env[key];
  if (!db) {
    throw new Error("no db");
  }
  return db;
}

export const config: APIConfig = {
    fileserverHits: 0,
    dbURL:envOrThrow("DB_URL")
};
