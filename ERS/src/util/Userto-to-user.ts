import { UserDTO } from "../dtos/user-dto";
import { User } from "../models/user";
import { Role } from "../models/role";

export function userDTOtoUser(usR: UserDTO[]): User {
    let roles = new Role(usR[0].role_id, usR[0].role_name);

    return new User(
        usR[0].user_id,
        usR[0].username,
        usR[0].password,
        usR[0].first_name,
        usR[0].last_name,
        usR[0].email,
        roles);
}

export function multiUserDTOConvertor(usR: UserDTO[]): User[] {
    let currentUser: UserDTO[] = [];
    const result: User[] = [];
    for (const g of usR) {
        if (currentUser.length === 0) {
            currentUser.push(g);
        } else if (currentUser[0].user_id === g.user_id) {
            currentUser.push(g);
        } else {
            result.push(userDTOtoUser(currentUser));
            currentUser = [];
            currentUser.push(g);
        }
    }
    result.push(userDTOtoUser(currentUser));
    return result;
}