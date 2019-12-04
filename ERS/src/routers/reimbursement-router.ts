import { authorization } from "../middleware/auth-middleware";
import express from 'express';
import { daoGetReimbursementByStatusId, daoGetReimbursementByUserById, daoSubmitReimbursement } from "../repositories/reimbursement-dao";
import { reimbursement } from "../models/reimbursement";
import { updateReimbursement } from "../services/reimburserment-service";

export const reimbursementsRouter = express.Router();


reimbursementsRouter.get('/status/:statusId', [authorization(['finance-manager'])],
    async (req, res) => {
        const id = +req.params.statusId;
        if (isNaN(id)) {
            res.sendStatus(400);
        } else {
            try {
                const reimbursement = await daoGetReimbursementByStatusId(id);
                res.status(200).json(reimbursement);
            } catch (e) {
                res.status(e.status).send(e.message);
            }
        }
    });

    reimbursementsRouter.get('/author/userId/:userId', [authorization(['finance-manager', 'Admin', 'User'])],
    async (req, res) => {
        const id = +req.params.userId;
        if (isNaN(id)) {
            res.sendStatus(400);
        } else {
            try {
                const reimbursement = await daoGetReimbursementByUserById(id);
                res.status(200).json(reimbursement);
            } catch (e) {
                res.status(e.status).send(e.message);
            }
        }
    });

    reimbursementsRouter.post('', [authorization(['finance-manager', 'admin', 'user'])],
    async (req, res) => {
        const { body } = req;
        const newR = new reimbursement(0, 0, 0, 0, 0, '', 0, 0, 0);
        try {
            let error = false;
            for (const key in newR) {
                if (body[key] === undefined) {                    
                    res.status(400).send('Please include all reimbursement fields');
                    error = true;
                    break;
                } else {
                    newR[key] = body[key];
                }
            }
            if (!error) {
                newR.author = req.session.user.userId;
                const reimbursement = await daoSubmitReimbursement(newR);
                res.status(201).json(reimbursement);
            }
        } catch (e) {
            res.status(e.status).send(e.message);
        }
    });

    reimbursementsRouter.patch('', [authorization(['finance-manager'])],
async (req, res) => {
    try {
        const { body } = req;
        const newR = new reimbursement(0, 0, 0, 0, 0, '', 0, 0, 0);
        newR.reimbursementId = body.reimbursementId;
        newR.status = body.status;
        const update = await updateReimbursement(newR);
        res.status(200).json(update);
    } catch (e) {
        res.status(e.status).send(e.message);
    }
});