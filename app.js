import 'dotenv/config'
import express from "express";
import session from 'express-session';
import cookieParser from 'cookie-parser';
import runnerRouter from "./routes/runner.js";
import { checkUserFromCookie } from './middlewares/checkUserFromCookie.js';
import { staticPath } from "./config/path.js";
const app = express();

app.use(express.static(staticPath, {
    index: false
}));

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

app.use("/runner", runnerRouter)

const PORT = 3014;
app.listen(PORT, console.log(`http://localhost:${PORT}`));
