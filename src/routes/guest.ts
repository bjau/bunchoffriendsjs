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
import { User } from '../orm';
const route = Router();

//--------------------------------------------------------
// Routes that are accessible by all users / guests
//--------------------------------------------------------

// Show the login form
route.get('/', (_req, res) => {
    res.render('index', { view: 'index' });
});

// Handle the login data posted from the home page 
// Usernames are case insensitive
route.post('/login', async (req, res) => {
    const username = String(req.body.username || '').toLowerCase();
    const password = String(req.body.password || '');
    const user = await User.byLogin(username, password);
    if (user != null) {
        req.session.user = user;
        res.redirect(303, 'home');
    } else
        res.render('index', { view: 'index', messages: ['Invalid username or password']});
});

// Form for signing up for a new account
route.get('/signup', (_req, res) => {
    res.render('signup', { view: 'signup' });
});

// Create a new account
// Checks for empty field values
// Prevents duplicate account creation
route.post('/signup', async (req, res) => {
    // Validate the input
    const username = String(req.body.username || '').toLowerCase();
    const password = String(req.body.password || '');
    const fullName = String(req.body.fullName || '');

    const messages = [];

    if (username.length == 0)
        messages.push('Username cannot be empty');
    if (password.length == 0)
        messages.push('Password cannot be empty');
    if (fullName.length == 0)
        messages.push('Full name cannot be empty');

    try {
        // Are there any validation errors?
        if (messages.length == 0) {
            // No errors - so create the new user
            await new User(username, password, fullName).create();
            return res.render('signup_success', { view: 'signup_success' });
        }
    } catch (e) {
        messages.push((e && e.message) || 'An error occurred');
    }
    res.render('signup', { view: 'signup', username, password, fullName, messages });
});

// Remove the currently logged in user from the session
route.get('/logout', (req, res) => {
    delete req.session.user;
    res.redirect(303, '/');
});

export default route;