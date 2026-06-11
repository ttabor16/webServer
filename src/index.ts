import express from "express";
import { handlerReadiness } from "./api/readiness.js";
import { reset } from "./api/reset.js";
import { metrics } from "./api/metrics.js";
import { middlewareLogResponses, middlewareMetricsInc } from "./api/middleware.js";

const app = express();
const PORT = 8080;
app.use(middlewareLogResponses);

app.use("/app", middlewareMetricsInc, express.static('./src/app'));

app.get("/api/healthz", handlerReadiness);

app.get("/admin/metrics", metrics);

app.get("/admin/reset", reset);

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
})