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