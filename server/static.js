import express from "express";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const staticPath = path.join(__dirname, '..', '..', 'static');

export function registerStaticRoutes(app) {
    app.use("/game/runner", express.static(path.join(staticPath, "runner")));
    app.use("/game/quiz", express.static(path.join(staticPath, "quiz")));
}
