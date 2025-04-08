import session from 'express-session';

export const sessionConfig = {
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60,
    },
};

export default session(sessionConfig);
