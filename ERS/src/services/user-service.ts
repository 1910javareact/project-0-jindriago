import { User } from "../models/user";
import { daoGetUserByUsernameAndPassword, daoGetAllUsers, daoGetUserById } from "../repositories/user-dao";

export async function getAllUsers(): Promise<User[]> {
    //do some processing
    try {
        return await daoGetAllUsers();
    } catch (e) {
        throw e; //we have to re-throw e or the error will get lost in async callbacks
    }

}

export function getUserById(id: number): Promise<User> {
    return daoGetUserById(id);
}



export function getUserByUsernameAndPassword(username: string, password: string ):Promise<User> {

    return daoGetUserByUsernameAndPassword(username, password);
}