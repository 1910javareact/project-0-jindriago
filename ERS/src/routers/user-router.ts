import express from 'express';
import { getAllUsers, getUserById } from '../services/user-service';
import { authorization } from '../middleware/auth-middleware';

export const userRouter = express.Router();

userRouter.get('', [authorization(['finance-manager'])],
async (req, res)=>{
    try {
        const user = await getAllUsers();
        res.json(user);
    } catch (e) {
        res.status(e.status).send(e.message);
    }
})

userRouter.get('/:id', [authorization(['finance-manager', 'admin', 'user'])],
async (req, res) => {
    const id = +req.params.id;
    if (isNaN(id)) {
        res.sendStatus(400);
    }else if (req.session.user.role.role === 'finance-manager') {
        try {
            const user = await getUserById(id);
            res.status(200).json(user);
        } catch (error) {
            res.status(error.status).send(error.message);
        }
    }else {
        try {
            const user = await getUserById(id);
            if (req.session.user.userId === user.userId) {
                res.status(200).json(user);
            }else {
                res.sendStatus(401);
            }
        } catch (error) {
            res.status(error.status).send(error.message);
        }
    }
});

