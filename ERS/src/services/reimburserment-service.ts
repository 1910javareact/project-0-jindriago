import { reimbursement } from "../models/reimbursement";
import { daoGetReimbursementByStatusId, daoGetReimbursementByUserById } from "../repositories/reimbursement-dao";


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


