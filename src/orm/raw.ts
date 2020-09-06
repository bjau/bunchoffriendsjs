/*
 * WARNING!
 *
 * This project is intentionally insecure.
 *
 * DO NOT use in production.
 *
 * It is designed for educational purposes - to teach common vulnerabilities in web applications.
 */

import alasql from 'alasql';

// Execute a raw SQL query
export default async function raw(query: string): Promise<any[]> {
    // Create the database schema
    return await alasql.promise(query);
}