/*
 * WARNING!
 *
 * This project is intentionally insecure.
 *
 * DO NOT use in production.
 *
 * It is designed for educational purposes - to teach common vulnerabilities in web applications.
 */

import User from './user';
import alasql from 'alasql';

// A relationship between two users
// New Friends are created whenever a user "connects" with another user
export default class Friend {

    constructor(
        public fromFriend: User, // User that performed the "connect" action
        public toFriend: User,   // User who was connected to
        public id?: number) {    // The unique identifier for the relationship
    }

    // For a new Friend instance, inserts the user data into the database
    async create(): Promise<void> {
        await alasql.promise(
            `insert into friends (friendFrom, friendTo) 
             values (${this.fromFriend.id}, ${this.toFriend.id})`
        );
        // Retrieve the identifier of the new row
        this.id = alasql.autoval('friends', 'id');
    }

}
