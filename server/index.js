import 'dotenv/config'
import express from "express";
import cookieParser from 'cookie-parser';
import scoreRouter from '../routes/scores.js';
import { authenticateJWT } from "../middlewares/auth.js";
import { registerStaticRoutes } from "./static.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(authenticateJWT);

registerStaticRoutes(app);

app.use("/game/api", scoreRouter);

export default app;