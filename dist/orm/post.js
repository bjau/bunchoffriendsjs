"use strict";
/*
 * WARNING!
 *
 * This project is intentionally insecure.
 *
 * DO NOT use in production.
 *
 * It is designed for educational purposes - to teach common vulnerabilities in web applications.
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const alasql_1 = __importDefault(require("alasql"));
const user_1 = __importDefault(require("./user"));
// Format used for rendering dates in the user interface
const dateFormat = new Intl.DateTimeFormat(undefined, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
});
// A social media post created by a user
// Once created, a post is visible to all other user have connected to the creator
class Post {
    constructor(creator, // The user who created the post
    message, // The content of the post
    creationDate, // The time the post was created by the user
    likes, // A count of the number of times the post has been liked by other users
    id) {
        this.creator = creator;
        this.message = message;
        this.creationDate = creationDate;
        this.likes = likes;
        this.id = id;
        // Initialize the like count on a new Post
        if (!likes)
            this.likes = 0;
        // Pre-format the creation-date
        this.formattedDate = dateFormat.format(creationDate);
    }
    // Find the unique post with a matching id
    // returns null if there is no such post
    static byId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let posts = yield Post.byWhere(`id = ${id}`);
            if (posts.length > 0)
                return posts[0];
            else
                return null;
        });
    }
    // Find all posts matching the supplied SQL 'where' clause
    static byWhere(where, order) {
        return __awaiter(this, void 0, void 0, function* () {
            let rows = yield alasql_1.default.promise(`select id, creator, message, creationDate, likes
             from posts
             where ${where}
             ` + (order ? `order by ${order}` : ``));
            let result = [];
            for (let row of rows) {
                result.push(new Post((yield user_1.default.byId(row.creator)), row.message, row.creationDate, row.likes, row.id));
            }
            return result;
        });
    }
    // Create a new post in the database
    // Updates 'this' with the new 'id'
    create() {
        return __awaiter(this, void 0, void 0, function* () {
            yield alasql_1.default.promise(`insert into posts (creator, message, creationDate, likes) 
             values (${this.creator.id}, '${this.message}', '${this.creationDate}', ${this.likes})`);
            // Retrive the identifier of the new row
            this.id = alasql_1.default.autoval('posts', 'id');
        });
    }
    // Increment the current like count, in the database, by one
    like() {
        return __awaiter(this, void 0, void 0, function* () {
            // Increase the like count in the database
            let result = yield alasql_1.default.promise(`update posts 
             set likes = likes + 1
             where id = ${this.id};
             select likes
             from posts
             where id = ${this.id}`);
            // Update the local state
            if (result.length == 2 && result[0] == 1 && result[1].length == 1)
                this.likes = result[1].likes;
        });
    }
}
exports.default = Post;
//# sourceMappingURL=post.js.map