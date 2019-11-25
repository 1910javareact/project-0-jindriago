import { PoolClient } from "pg";
import { connectionPool } from '.';
import { userDTOtoUser } from "../util/Userto-to-user";
import { User } from "../models/user";


export async function daoGetUserByUsernameAndPassword(username: string, password: string): Promise<User> {
    let client: PoolClient;

    try {
        client = await connectionPool.connect();
        
        const result = await client.query('select * from westeros."user" natural join westeros.user_roles natural join westeros.roles where username = $1 and "password" = $2', 
        [username, password]);
        if (result.rowCount === 0) {
            throw 'bad credentials';
        } else {
            return userDTOtoUser(result.rows);
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