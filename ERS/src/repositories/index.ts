import { Pool } from 'pg';
console.log({
    user: 'Jon Snow',
    host: 'database-1.c8s7u9dff4fw.us-east-2.rds.amazonaws.com',
    database: 'postgres',
    password: 'password',
    port: 5432,
    max: 5,
});


export const connectionPool: Pool = new Pool({
    user: 'Jon Snow',
    host: 'database-1.c8s7u9dff4fw.us-east-2.rds.amazonaws.com',
    database: 'postgres',
    password: 'password',
    port: 5432,
    max: 5,
});