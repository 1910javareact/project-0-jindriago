import session from 'express-session';

const sess = {
    secret: 'secret',
    cookie: {secure: false},
    resave: false,
    saveinitialized: false
};


export const sessionMiddleware = session(sess);

