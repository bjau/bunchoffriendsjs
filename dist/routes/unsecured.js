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
const express_promise_router_1 = __importDefault(require("express-promise-router"));
const orm_1 = require("../orm");
const route = express_promise_router_1.default();
//--------------------------------------------------------
// Routes that *should* only be used by logged in users
// Note: these are intentionally not properly secured
//--------------------------------------------------------
// Shows the list of posts by a friend
// Note: no validation that the friend actually is a friend of the current user
route.get('/posts_friend', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let friendId = Number(req.query.friend);
    let friend = yield orm_1.User.byId(friendId);
    let posts = [];
    if (friend != null)
        posts = yield friend.findPosts();
    res.render('posts_friend', { view: 'posts_friend', friend, posts });
}));
// Like a post and redirect to the 'back' parameter
// Note: the back parameter can be used for invalidated redirects
// Note: no validation to prevent the user from liking their own posts
route.get('/like', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let postId = Number(req.query.post);
    let back = String(req.query.back);
    let friendId = req.query.friend ? Number(req.query.friend) : null;
    let post = yield orm_1.Post.byId(postId);
    if (post != null)
        yield post.like();
    res.redirect(303, back + (friendId ? `?friend=${friendId}` : ``));
}));
// Show the admin zone
route.get('/admin', (_req, res) => {
    res.render('admin', { view: 'admin' });
});
// Handle a query posted to the admin zone
route.post('/admin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let query = String(req.body.query);
    let rows = null;
    let errors = null;
    try {
        // Perform the SQL query
        let results = yield orm_1.raw(query);
        // Convert the results from any[]
        // into [string[], ...any[][]]
        rows = [];
        if (results && results.length > 0) {
            // Use the first row of results to get the column names
            let header = [];
            for (let key in results[0])
                header.push(key);
            rows.push(header);
            // Now iterate through each row to build an array of values
            for (let result of results) {
                let row = [];
                for (let key of header)
                    row.push(result[key]);
                rows.push(row);
            }
        }
    }
    catch (e) {
        errors = e.toString();
    }
    res.render('admin', { view: 'admin', query, rows, errors });
}));
exports.default = route;
//# sourceMappingURL=unsecured.js.map