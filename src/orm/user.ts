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
import Post from './post';

// A user in the system
export default class User {

    constructor(
        public username: string, // Login name
        public password: string, // Unhashed password
        public fullName: string, // Display name for the user interface
        public id?: number) {    // Unique identifier for the user
    }

    // Find the unique user with a matching id
    // returns null if there is no such user
    static async byId(id: number): Promise<User | null> {
        let users = await User.byWhere(`id = ${id}`);
        if (users.length > 0)
            return users[0];
        else
            return null;
    }

    // Find the unique user with a matching login username
    // returns null if there is no such user
    static async byLogin(username: string, password: string): Promise<User | null> {
        let users = await User.byWhere(
            `username = '${username}' 
             and password = '${password}'`
        );
        if (users.length > 0)
            return users[0];
        else
            return null;
    }

    // Find all users matching the supplied SQL 'where' clause
    static async byWhere(where: string, order?: string): Promise<User[]> {
        let rows = await alasql.promise(
            `select id, username, password, fullName
             from users
             where ${where}
             ` + (order ? `order by ${order}` : ``)
        );
        return (rows as any[]).map(row => new User(row.username, row.password, row.fullName, row.id));
    }

    // Create a new user in the database
    // Updates 'this' with the new 'id'
    async create() {
        try {
            await alasql.promise(
                `insert into users (username, password, fullName) 
                 values ('${this.username}', '${this.password}', '${this.fullName}')`
            );
            // Retrive the identifier of the new row
            this.id = alasql.autoval('users', 'id');
        } catch (e) {
            throw new Error('Username already exists');
        }
    }

    // Find all friends of this user
    // (i.e., users that this user has connected to)
    findFriends(): Promise<User[]> {
        return User.byWhere(
            `id in (
                    select friendTo
                    from friends
                    where friendFrom = ${this.id}
             )`,
             `fullName asc`
        );
    }

    // Find all users in the system who the user could befriend (connect)
    // (i.e., users that this user has not already connected to)
    findNotFriends(): Promise<User[]> {
        return User.byWhere(
            `id not in (
                    select friendTo
                    from friends
                    where friendFrom = ${this.id}
             )`,
             `fullName asc`
        );
    }

    // Find all posts by this user
    findPosts(): Promise<Post[]> {
        return Post.byWhere(
            `creator = ${this.id}`,
            `creationDate desc`
        );
    }

    // Find all posts by this user and friends of this user
    findFriendPosts(): Promise<Post[]> {
        return Post.byWhere(
            `creator in (
                select friendTo
                from friends
                where friendFrom = ${this.id}
                union all
                select ${this.id}
            )`,
            `creationDate desc`
        );
    }

}