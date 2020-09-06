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
// Routes that are accessible by all users / guests
//--------------------------------------------------------
// Show the login form
route.get('/', (_req, res) => {
    res.render('index', { view: 'index' });
});
// Handle the login data posted from the home page 
// Usernames are case insensitive
route.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = String(req.body.username || '').toLowerCase();
    const password = String(req.body.password || '');
    const user = yield orm_1.User.byLogin(username, password);
    if (user != null) {
        req.session.user = user;
        res.redirect(303, 'home');
    }
    else
        res.render('index', { view: 'index', messages: ['Invalid username or password'] });
}));
// Form for signing up for a new account
route.get('/signup', (_req, res) => {
    res.render('signup', { view: 'signup' });
});
// Create a new account
// Checks for empty field values
// Prevents duplicate account creation
route.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
            yield new orm_1.User(username, password, fullName).create();
            return res.render('signup_success', { view: 'signup_success' });
        }
    }
    catch (e) {
        messages.push((e && e.message) || 'An error occurred');
    }
    res.render('signup', { view: 'signup', username, password, fullName, messages });
}));
// Remove the currently logged in user from the session
route.get('/logout', (req, res) => {
    delete req.session.user;
    res.redirect(303, '/');
});
exports.default = route;
//# sourceMappingURL=guest.js.map