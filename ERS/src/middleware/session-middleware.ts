import session from 'express-session';

//this is  for initial config file for the session function
const sess = {
    secret: 'secret',
    cookie: {secure: false},
    resave: false,
    saveinitialized: false
};

// the session function follows a factory pattern
// in js this is also like the higher order function pattern
// this means, we pass in config to the session function
// and it returns a new function generated using that config

export const sessionMiddleware = session(sess);

