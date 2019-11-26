import { reimbursementDTO } from "../dtos/reimbursement-dto";
import { reimbursement } from "../models/reimbursement";



export function reimbursementDTOtoreimbursement(rED: reimbursementDTO[]): reimbursement {
    return new reimbursement(
        rED[0].reimbursement_id,
        rED[0].author,
        rED[0].amount,
        rED[0].date_submitted,
        rED[0].date_resolved,
        rED[0].description,
        rED[0].resolver,
        rED[0].status,
        rED[0].type
    );
}

export function multiReimbursementDTOConverter(rED: reimbursementDTO[]): reimbursement[] {
    let currentReimbursement: reimbursementDTO[] = [];
    const result: reimbursement[] = [];
    for (const r of rED) {
        if (currentReimbursement.length === 0) {
            currentReimbursement.push(r);
        }else if (currentReimbursement[0].reimbursement_id === r.reimbursement_id) {
            currentReimbursement.push(r);
        }else {
            result.push(reimbursementDTOtoreimbursement(currentReimbursement));
            currentReimbursement = [];
            currentReimbursement.push(r);
        }
    }
    result.push(reimbursementDTOtoreimbursement(currentReimbursement));
    return result;
}