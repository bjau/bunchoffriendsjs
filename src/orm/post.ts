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
import User from './user';

// Format used for rendering dates in the user interface
const dateFormat = new Intl.DateTimeFormat(
    undefined, 
    {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    }
);

// A social media post created by a user
// Once created, a post is visible to all other user have connected to the creator
export default class Post {

    // A pre-formatted version of the creationDate
    public formattedDate: string;

    constructor(
        public creator: User,      // The user who created the post
        public message: string,    // The content of the post
        public creationDate: Date, // The time the post was created by the user
        public likes?: number,     // A count of the number of times the post has been liked by other users
        public id?: number) {      // The unique identifier of the post

        // Initialize the like count on a new Post
        if (!likes)
            this.likes = 0;

        // Pre-format the creation-date
        this.formattedDate = dateFormat.format(creationDate);
    }

    // Find the unique post with a matching id
    // returns null if there is no such post
    static async byId(id: number): Promise<Post | null> {
        const posts = await Post.byWhere(`id = ${id}`);
        if (posts.length > 0)
            return posts[0];
        else
            return null;
    }

    // Find all posts matching the supplied SQL 'where' clause
    static async byWhere(where: string, order?: string): Promise<Post[]> {
        const rows = await alasql.promise(
            `select id, creator, message, creationDate, likes
             from posts
             where ${where}
             ` + (order ? `order by ${order}` : '')
        );
        const result = [];
        for (const row of rows) {
            const creator = await User.byId(row.creator);
            if (creator)
                result.push(
                    new Post(
                        creator, 
                        row.message,
                        row.creationDate,
                        row.likes,
                        row.id
                    )
                );
        }
        return result;
    }

    // Create a new post in the database
    // Updates 'this' with the new 'id'
    async create(): Promise<void> {
        await alasql.promise(
            `insert into posts (creator, message, creationDate, likes) 
             values (${this.creator.id}, '${this.message}', '${this.creationDate}', ${this.likes})`
        );
        // Retrive the identifier of the new row
        this.id = alasql.autoval('posts', 'id');
    }

    // Increment the current like count, in the database, by one
    async like(): Promise<void> {
        // Increase the like count in the database
        const result = await alasql.promise(
            `update posts 
             set likes = likes + 1
             where id = ${this.id};
             select likes
             from posts
             where id = ${this.id}`
        );

        // Update the local state
        if (result.length == 2 && result[0] == 1 && result[1].length == 1)
            this.likes = result[1].likes;
    }

}