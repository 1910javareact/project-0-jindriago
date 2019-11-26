

export function authorization(authRoles: string[]) {//authRoles, is our config
    //I want to return a middleware function
    //generated using these authoRoles
    
    return (req, res, next) => {
        let isAuth = false;
        //lets check for being logged in
        if (!req.session.user) {
            res.status(401).send('Please Login');
            return;
        }
        for (const userRole of req.session.user.roles) {
            if (authRoles.includes(userRole)) {
                isAuth = true;
            }
        }
        if (isAuth) {
            next();
        } else {
            res.status(403).send('You are unauthorized for this endpoint');
        }
    };
    
    }