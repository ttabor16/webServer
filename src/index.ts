import express from "express";
import { handlerReadiness } from "./api/readiness.js";
import { reset } from "./api/reset.js";
import { metrics } from "./api/metrics.js";
import { middlewareLogResponses, middlewareMetricsInc } from "./api/middleware.js";
import { validate_chirp } from "./api/chirps.js";
import { errorHandler } from "./api/error.js";


const app = express();
const PORT = 8080;
app.use(middlewareLogResponses);
app.use(express.json());

app.use("/app", middlewareMetricsInc, express.static('./src/app'));

app.get("/api/healthz", handlerReadiness);

app.post("/api/validate_chirp", validate_chirp); 

app.get("/admin/metrics", metrics);

app.post("/admin/reset", reset);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
})