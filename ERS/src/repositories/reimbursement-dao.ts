import { PoolClient } from "pg";
import { connectionPool } from ".";
import { reimbursement } from "../models/reimbursement";
import { multiReimbursementDTOConverter } from "../util/reimbursementdto-to-reimbursement";

export async function daoGetReimbursementByStatusId(id: number): Promise <reimbursement[]> {
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        const result = await client.query('select * from westeros.reimbursement where status = $1 order by date_submitted desc', [id]);
        if (result.rowCount > 0) {
            return multiReimbursementDTOConverter(result.rows);
        }else {
            throw 'No Such Reimbursement';
        }
    } catch (e) {
        if (e === 'No Such Reimbursement') {
            throw {
                status: 404,
                message: 'This reimbursement does not exist'
            };
        }else {
            throw {
                status: 500,
                message: 'Internal Server Error'
            };
        }
    } finally {
        client && client.release();
    }
}