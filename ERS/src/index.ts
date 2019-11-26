import express from 'express';
import bodyparser from 'body-parser';
import { sessionMiddleware } from './middleware/session-middleware';
import { getUserByUsernameAndPassword } from './services/user-service';
import { userRouter } from './routers/user-router';
import { reimbursementsRouter } from './routers/reimbursement-router';
import { loggingMiddleware } from './middleware/logging-middleware';


const app = express();

app.use(bodyparser.json());

app.use(loggingMiddleware);


app.use(sessionMiddleware)




app.post('/login', async (req,res)=>{
    let {username, password} = req.body
    if(!username || !password ){
        res.status(400).send('please have a username and password field')
    }
    try {
        const user = await getUserByUsernameAndPassword(username, password);
        req.session.user = user;
        res.json(user); 
    } catch (e) {
        res.status(e.status).send(e.message);
    }
});

app.use('/users', userRouter);


app.use('/reimbursements', reimbursementsRouter);


app.listen(2001, () => {
    console.log('app has started');
});