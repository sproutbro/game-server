import express from "express";
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cookieParser());

app.get('/skytype1', (req, res) => {
    console.log('🍪 쿠키 정보:', req.cookies);
    res.sendFile(path.join(publicPath, "skytype1", 'index.html'));
});

app.get('/skytype2', (req, res) => {
    res.sendFile(path.join(publicPath, "skytype2", 'index.html'));
});

app.get('/skytype3', (req, res) => {
    res.sendFile(path.join(publicPath, "skytype3", 'index.html'));
});

const publicPath = path.join(__dirname, '..', 'public');
app.use(express.static(publicPath));

const PORT = 3014;
app.listen(PORT, console.log(`http://localhost:${PORT}`));
