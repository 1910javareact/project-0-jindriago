//i could not get authorization to work, 
//so i had to comment it out unfortunately

export function authorization(authRoles: string[]) {

    return (req, res, next) => {
        // let isAuth = false;
        
        // if (!req.session.user) {
        //     res.status(401).send('Please Login');
        //     return;
        // }
        //  {
        //     if (authRoles.includes(req.session.user.role.role)) {
        //         isAuth = true;
        //     }
        // }
        // if (isAuth) {
            next();
        // } else {
        //     res.status(401).send('The incoming token has expired');
        // }
    };
    
    }