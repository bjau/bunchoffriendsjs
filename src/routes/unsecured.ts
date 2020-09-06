/*
 * WARNING!
 *
 * This project is intentionally insecure.
 *
 * DO NOT use in production.
 *
 * It is designed for educational purposes - to teach common vulnerabilities in web applications.
 */

import Router from 'express-promise-router';
import { User, Post, raw } from '../orm';
const route = Router();

//--------------------------------------------------------
// Routes that *should* only be used by logged in users
// Note: these are intentionally not properly secured
//--------------------------------------------------------

// Shows the list of posts by a friend
// Note: no validation that the friend actually is a friend of the current user
route.get('/posts_friend', async (req, res) => {
    const friendId = Number(req.query.friend);
    const friend = await User.byId(friendId);
    let posts: Post[] = [];
    if (friend != null)
        posts = await friend.findPosts();
    res.render('posts_friend', { view: 'posts_friend', friend, posts});
});

// Like a post and redirect to the 'back' parameter
// Note: the back parameter can be used for invalidated redirects
// Note: no validation to prevent the user from liking their own posts
route.get('/like', async (req, res) => {
    const postId = Number(req.query.post);
    const back = String(req.query.back);
    const friendId = req.query.friend ? Number(req.query.friend) : null;
    const post = await Post.byId(postId);
    if (post != null)
        await post.like();
    res.redirect(303, back + (friendId ? `?friend=${friendId}` : ''));
});

// Show the admin zone
route.get('/admin', (_req, res) => {
    res.render('admin', { view: 'admin'});
});

// Handle a query posted to the admin zone
route.post('/admin', async (req, res) => {
    const query = String(req.body.query);
    let rows = null;
    let errors = null;
    try {
        // Perform the SQL query
        const results = await raw(query);

        // Convert the results from any[]
        // into [string[], ...any[][]]
        rows = [];
        if (results && results.length > 0) {
            // Use the first row of results to get the column names
            const header = [];
            for (const key in results[0])
                header.push(key);
            rows.push(header);

            // Now iterate through each row to build an array of values
            for (const result of results) {
                const row = [];
                for (const key of header)
                    row.push(result[key]);
                rows.push(row);
            }
        }
    } catch (e) {
        errors = e.toString();
    }
    res.render('admin', { view: 'admin', query, rows, errors });
});

export default route;