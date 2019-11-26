import { User } from './models/user';
import { Role } from './models/role';
import { reimbursement } from './models/reimbursement';

export let Users = [
    new User(1, 'kingofthenorth', 'password', 'Jon', 'Snow', 'iknownothing@westeros.com', new Role(1, 'Admin')),
    new User(2, 'thehalfman', 'password', 'Tyrion', 'Lannister', 'handtoqueen@westeros.com', new Role(2, 'Finance Manager'))
];

export let Reimbursements = [
    new reimbursement(1, 1, 500, 11252019, 11262019, 'Food for Drogon', 2, 2, 3),
    new reimbursement(2, 2, 50, 11242019, 1, 'Food and wine', 2, 1, 3)
];