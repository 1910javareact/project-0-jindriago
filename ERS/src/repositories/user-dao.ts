import { PoolClient } from "pg";
import { connectionPool } from '.';
import { userDTOtoUser, multiUserDTOConvertor } from "../util/Userto-to-user";
import { User } from "../models/user";


export async function daoGetUserByUsernameAndPassword(username: string, password: string): Promise<User> {
    let client: PoolClient;

    try {
        client = await connectionPool.connect();
        
        const result = await client.query('select * from westeros."user" natural join westeros.user_roles natural join westeros.roles where username = $1 and "password" = $2', 
        [username, password]);
        if (result.rowCount === 0) {
            throw 'Invalid Credentials';
        } else {
            return userDTOtoUser(result.rows);
        }
    } catch (e) {
        console.log(e);
        if (e === 'Invalid Credentials') {
            throw {
                status: 400,
                message: 'Invalid Credentials'
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



export async function daoGetAllUsers(): Promise<User[]> {
    let client: PoolClient;
 
    try {

        client = await connectionPool.connect();

        const result = await client.query('SELECT * FROM westeros."user" natural join westeros.user_roles natural join westeros.roles');
        return multiUserDTOConvertor(result.rows);
    } catch (e) {
        console.log(e);
        throw {
            status: 500,
            message: 'Internal Server Error'
        };
    } finally {
        client && client.release();
    }
}

export async function daoGetUserById(id: number): Promise<User> {
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        const result = await client.query('select * from westeros."user" natural join westeros.user_roles natural join westeros.roles where user_id = $1', [id]);
        if (result.rowCount > 0) {
            return userDTOtoUser(result.rows);
        } else {
            throw 'No Such User';
        }

    } catch (e) {
        if (e === 'No Such User') {
            throw {
                status: 404,
                message: 'this user does not exist'
            }; //this is an error
        } else {
            throw  {
                status: 500,
                message: 'Internal Server Error'
            };
        }
    }

}