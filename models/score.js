import { db } from "./db.js";

export async function saveScore({ userId, game, score }) {
    const result = await db.query(
        `INSERT INTO 
            scores (user_id, game, score) 
        VALUES 
            ($1, $2, $3) 
        RETURNING 
            id`,
        [userId, game, score]
    );
    return result.rows[0];
}

export async function findScoreById(userId) {
    const result = await db.query(
        `SELECT 
            id, score
        FROM 
            SCORES 
        WHERE
            USER_ID = $1
        ORDER BY 
            SCORE 
        DESC LIMIT 1`,
        [userId]
    )

    return result.rows[0] ?? { id: null, score: null };
}

export async function updateScore(id, score) {
    const result = await db.query(
        `UPDATE 
            scores
        SET 
            score = $2, 
            created_at = now()
        WHERE 
            id = $1
        RETURNING 
            score`,
        [id, score]
    )

    return result.rows[0] ?? null;
}