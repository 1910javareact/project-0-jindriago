import { PoolClient } from "pg";
import { connectionPool } from ".";
import { reimbursement } from "../models/reimbursement";
import { multiReimbursementDTOConverter, reimbursementDTOtoreimbursement } from "../util/reimbursementdto-to-reimbursement";

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

export async function daoGetReimbursementByUserById(id: number): Promise<reimbursement[]> {
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        const result = await client.query('select * from westeros.reimbursement where author = $1', [id]);
        if (result.rowCount > 0) {
            return multiReimbursementDTOConverter(result.rows);
        } else {
            throw 'No Such Reimbursement';
        }

    } catch (e) {
        if (e === 'No Such Reimbursement') {
            throw {
                status: 404,
                message: 'this reimbursement does not exist'
            }; //this is an error
        } else {
            throw  {
                status: 500,
                message: 'Internal Server Error'
            };
        }
    }

}

export async function daoSubmitReimbursement(r: reimbursement): Promise<reimbursement> {
    let client: PoolClient;
    client = await connectionPool.connect();
    try {
        await client.query('INSERT INTO westeros.reimbursement (author, amount, date_submitted, date_resolved, description, resolver, status, "type") values ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING reimbursement_id',
        [r.author, r.amount, r.dateSubmitted, r.dateResolved, r.description, r.resolver, r.status, r.type]);
        return r;
        } catch (e) {
        throw {
            status: 500,
            message: `Internal Server Error`
        };
        
    } finally {
        client && client.release();
    }
}

export async function daoUpdateReimbursement(r: reimbursement): Promise<reimbursement> {
    let client: PoolClient;
    client = await connectionPool.connect();
    try {
        await client.query('BEGIN');
        await client.query('update westeros.reimbursement set status = $1 where reimbursement_id = $2',
        [r.status, r.reimbursementId]);
        const result = await client.query('select * from westeros.reimbursement where reimbursement_id = $1',
        [r.reimbursementId]);
        await client.query('COMMIT');
        return reimbursementDTOtoreimbursement(result.rows);
    } catch (e) {
        await client.query('ROLLBACK');
        throw {
            status: 500,
            message: 'Internal Server Error'
        };
    } finally {
        client && client.release();
    }

}