import express from "express";
import { handlerReadiness } from "./api/readiness.js";
import { reset } from "./api/reset.js";
import { metrics } from "./api/metrics.js";
import { middlewareLogResponses, middlewareMetricsInc, errorHandler } from "./api/middleware.js";
import { validate_chirp } from "./api/chirps.js";
import { config } from "./config.js";
import postgres from "postgres";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { drizzle } from "drizzle-orm/postgres-js";
import { handlerUserCreate } from "./api/users.js";

const migrationClient = postgres(config.db.url, { max: 1 });
await migrate(drizzle(migrationClient), config.db.migrationConfig);

const app = express();

app.use(middlewareLogResponses);

app.use(express.json());

app.use("/app", middlewareMetricsInc, express.static('./src/app'));

app.get("/api/healthz", handlerReadiness);

app.post("/api/validate_chirp", validate_chirp); 

app.get("/admin/metrics", metrics);

app.post("/admin/reset", reset);

app.post("/api/users", handlerUserCreate);

app.use(errorHandler);

app.listen(config.api.port, () => {
    console.log(`Server is running at http://localhost:${config.api.port}`);
})