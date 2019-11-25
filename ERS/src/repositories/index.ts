import { Pool } from 'pg';
console.log({
    user: 'postgres',
    host: 'database-1.c8s7u9dff4fw.us-east-2.rds.amazonaws.com',
    database: 'postgres',
    password: 'password',
    port: 5432,
    max: 5,
});


export const connectionPool: Pool = new Pool({
    user: 'postgres',
    host: 'database-1.c8s7u9dff4fw.us-east-2.rds.amazonaws.com',
    database: 'postgres',
    password: 'password',
    port: 5432,
    max: 5,
});