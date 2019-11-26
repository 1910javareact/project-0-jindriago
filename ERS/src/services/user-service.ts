import { User } from "../models/user";
import { daoGetUserByUsernameAndPassword, daoGetAllUsers, daoGetUserById } from "../repositories/user-dao";

export async function getAllUsers(): Promise<User[]> {
    
    try {
        return await daoGetAllUsers();
    } catch (e) {
        throw e; 
    }

}

export function getUserById(id: number): Promise<User> {
    return daoGetUserById(id);
}



export function getUserByUsernameAndPassword(username: string, password: string ):Promise<User> {

    return daoGetUserByUsernameAndPassword(username, password);
}