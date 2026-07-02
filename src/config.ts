import type { MigrationConfig } from "drizzle-orm/migrator";
process.loadEnvFile()


export type APIConfig = {
  fileServerHits: number;
  port: number;
  platform: string;
};

export const migrationConfig: MigrationConfig = {
  migrationsFolder: "./src/db/migrations",
};

export function envOrThrow(key: string): string{
  const db = process.env[key];
  if (!db) {
    throw new Error("no value");
  }
  return db;
};

export type DBConfig = {
  url: string;
  migrationConfig: MigrationConfig
};

export const aConfig: APIConfig = {
  fileServerHits: 0,
  port: Number(envOrThrow("PORT")),
  platform: String(envOrThrow("PLATFORM")),
};

export const dConfig: DBConfig = {
  url: envOrThrow("DB_URL"),
  migrationConfig: migrationConfig,
}


export const config = {
    api: aConfig,
    db: dConfig,
};
