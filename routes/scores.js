import express from 'express';
import { saveScore } from "../models/score.js";
const router = express.Router();

router.post("/scores", async (req, res) => {
    if (!req.user) {
        return res.status(201).json({ message: '비회원 완료' });
    }

    const userId = req.user?.id;
    const score = req.body.score;

    if (!userId || !score) {
        return res.status(400).json({ message: '필수 값 누락' });
    }

    try {
        const id = await saveScore({ userId, game: "runner", score });
        res.status(201).json({ message: '점수 등록 완료', data: id });
    } catch (error) {
        console.error(error);
    }
});

export default router;