import 'dotenv/config'
import express from "express";
import session from 'express-session';
import cookieParser from 'cookie-parser';
import path from "path";
import { fileURLToPath } from 'url';
import { checkUserFromCookie } from './middlewares/checkUserFromCookie.js';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const staticPath = path.join(__dirname, '..', "static");

app.use(express.json());
app.use(cookieParser());
app.use(session({
    secret: 'super-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60
    }
}));

app.use(checkUserFromCookie);

app.use("/game/runner", express.static(path.join(staticPath, "runner")));

const PORT = 3014;
app.listen(PORT, console.log(`http://localhost:${PORT}`));
