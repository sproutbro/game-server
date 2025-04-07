import { staticPath } from "../config/path.js";
import express from 'express';
import path from 'path';

const router = express.Router();

router.get('/', async (req, res) => {
    res.sendFile(path.join(staticPath, "runner", 'index.html'));
});

export default router;