import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export function authenticateJWT(req, res, next) {
    if (req.session.user) return next();

    const token = req.cookies?.auth_token;
    if (!token) {
        return next();
    }

    try {
        const user = jwt.verify(token, JWT_SECRET);
        if (user.id && user.nickname) {
            req.session.user = { id: user.id, nickname: user.nickname };
        }
    } catch (err) {
        console.error(err);
    }

    next();
}
