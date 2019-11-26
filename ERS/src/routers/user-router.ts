import express from 'express';
import { getAllUsers } from '../services/user-service';
import { daoGetUserById } from '../repositories/user-dao';

export const userRouter = express.Router();

userRouter.get('', async (req, res)=>{
    try {
        const user = await getAllUsers();
        res.json(user);
    } catch (e) {
        res.status(e.status).send(e.message);
    }
})

userRouter.get('/:id', async (req, res) => {
    const id = +req.params.id; //from req.params, give me id
    if (isNaN(id)) {
        res.sendStatus(400);
    } else {
        try {
            const garden = await daoGetUserById(id);
            res.json(garden);
        } catch (e) {
            res.status(e.status).send(e.message);
        }

    }
});

