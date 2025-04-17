import express from 'express';
import { saveScore, findScoreById, updateScore } from "../models/score.js";
const router = express.Router();

router.post("/scores", async (req, res) => {
    const userId = req.user?.id;
    const { id, score } = await tryFindScoreById(userId);
    const newScore = req.body.score;

    if (!userId || !newScore) {
        return res.status(400).json({ message: "", score: "" });
    }

    if (!id) {
        const id = await trySaveScore(userId, newScore);
        if (id) return res.status(201).json({ message: 'Save new score', score: newScore });
    }

    if (newScore < score) {
        return res.status(201).json({ message: 'Best score', score });
    }

    const bestScore = await tryUpdateScore(id, newScore);
    if (bestScore) res.status(201).json({ message: 'New best score', score: newScore });
});

export default router;

async function tryFindScoreById(userId) {
    try {
        return await findScoreById(userId);
    } catch (error) {
        console.error(error);
    }
}

async function trySaveScore(userId, score) {
    try {
        return await saveScore({ userId, game: "runner", score });
    } catch (error) {
        console.error(error);
    }
}

async function tryUpdateScore(id, newScore) {
    try {
        return await updateScore(id, newScore);
    } catch (error) {
        console.error(error);
    }
}
