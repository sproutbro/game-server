import { db } from "./db.js";

export async function findUserById(id) {
    const result = await db.query(
        `SELECT
            id,
            nickname,
            provider,
            TO_CHAR (created_at, 'YYYY-MM-DD') as created_at
        FROM
            users
        WHERE
            id = $1`,
        [id]
    );
    return result.rows[0] ?? null;
}
