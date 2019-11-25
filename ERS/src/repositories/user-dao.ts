import { PoolClient } from "pg";
import { connectionPool } from '.';


export async function daoGetUserByUsernameAndPassword(username: string, password: string): Promise<User> {
    let client: PoolClient;

    try {
        client = await connectionPool.connect();
        
        const result = await client.query('', [username, password]);
        if (result.rowCount === 0) {
            throw 'bad credentials';
        } else {
            return gardenDTOtoGarden(result.rows);
        }
    } catch (e) {
        console.log(e);
        if (e === 'bad credentials') {
            throw {
                status: 401,
                message: 'Bad credentials'
            };
        } else {
            throw {
                status: 500,
                message: 'Internal Server Error'
            };
        }
    } finally {
        client && client.release();
    }
}