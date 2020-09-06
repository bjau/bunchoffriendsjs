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
import { User, Post, Friend } from '../orm';
const route = Router();

//--------------------------------------------------------
// Routes that may only be used by logged in users
//--------------------------------------------------------

// Check the session is logged in before continuing
// If the user has not logged in, redirect back to home
route.use((req, res, next) => {
    if (!req.session.user)
        res.redirect(303, '/');
    else
        next();
});

// Render the home page
// Includes a list of posts by friends
route.get('/home', async (req, res) => {
    const posts = await req.session.user?.findFriendPosts();
    res.render('home', { ...req.session, view: 'home', posts});
});

// Show a list of current friends and people who are not yet friends
route.get('/friend_list', async (req, res) => {
    const friends = await req.session.user?.findFriends();
    const notFriends = await req.session.user?.findNotFriends();
    res.render('friend_list', { ...req.session, view: 'friend_list', friends, notFriends});
});

// Show a list of posts by the current user
route.get('/posts_me', async (req, res) => {
    const posts = await req.session.user?.findPosts();
    res.render('posts_me', { ...req.session, view: 'posts_me', posts});
});

// Create a new post and redirect back to the back parameter
// Note: the back parameter can be used for invalidated redirects
route.post('/post', async (req, res) => {
    const message = String(req.body.message || '');
    const back = String(req.body.back || 'home');
    if (req.session.user)
        await new Post(req.session.user, message, new Date(), 0).create();
    res.redirect(303, back);
});

// Add/connect to a friend based on their ID
// Note: a GET request and no CSRF protections makes CSRF possible 
route.get('/friend_add', async (req, res) => {
    const friendId = Number(req.query.friend);
    // Retrieve the new friend
    const friend = await User.byId(friendId);
    // If found, then add the new relationship/connection
    if (friend && req.session.user)
        new Friend(req.session.user, friend).create();
    res.render('friend_add', { ...req.session, view: 'friend_add', friend});
});

export default route;