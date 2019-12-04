import { reimbursement } from "../models/reimbursement";
import { daoGetReimbursementByStatusId, daoGetReimbursementByUserById, daoSubmitReimbursement, daoUpdateReimbursement } from "../repositories/reimbursement-dao";


export async function getReumbursementByStatusId(id:number): Promise<reimbursement[]> {
   
    try {
        return await daoGetReimbursementByStatusId(id);
    } catch (e) {
        throw e; 
    }

}

export function getReimbursementByUserId(id: number): Promise<reimbursement[]> {
    try {
        return daoGetReimbursementByUserById(id);
    } catch (e) {
        throw e;
    }
}

export function sendSubmitReimbursement(r: reimbursement): Promise<reimbursement>{
    try {
        return daoSubmitReimbursement(r);
        
    } catch (e) {
        throw e;
    }
}

export function updateReimbursement (r: reimbursement): Promise<reimbursement>{
    try {
        return daoUpdateReimbursement(r);
    } catch (e) {
        throw e;
        
    }
}
