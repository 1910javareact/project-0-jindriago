import { authorization } from "../middleware/auth-middleware";
import express from 'express';
import { daoGetReimbursementByStatusId } from "../repositories/reimbursement-dao";

export const reimbursementsRouter = express.Router();


reimbursementsRouter.get('/status/:statusId', [authorization(['Finance Manager'])],
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