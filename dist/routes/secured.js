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
route.get('/home', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let posts = yield ((_a = req.session.user) === null || _a === void 0 ? void 0 : _a.findFriendPosts());
    res.render('home', Object.assign(Object.assign({}, req.session), { view: 'home', posts }));
}));
// Show a list of current friends and people who are not yet friends
route.get('/friend_list', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c;
    let friends = yield ((_b = req.session.user) === null || _b === void 0 ? void 0 : _b.findFriends());
    let notFriends = yield ((_c = req.session.user) === null || _c === void 0 ? void 0 : _c.findNotFriends());
    res.render('friend_list', Object.assign(Object.assign({}, req.session), { view: 'friend_list', friends, notFriends }));
}));
// Show a list of posts by the current user
route.get('/posts_me', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    let posts = yield ((_d = req.session.user) === null || _d === void 0 ? void 0 : _d.findPosts());
    res.render('posts_me', Object.assign(Object.assign({}, req.session), { view: 'posts_me', posts }));
}));
// Create a new post and redirect back to the back parameter
// Note: the back parameter can be used for invalidated redirects
route.post('/post', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let message = String(req.body.message || '');
    let back = String(req.body.back || 'home');
    yield new orm_1.Post(req.session.user, message, new Date(), 0).create();
    res.redirect(303, back);
}));
// Add/connect to a friend based on their ID
// Note: a GET request and no CSRF protections makes CSRF possible 
route.get('/friend_add', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let friendId = Number(req.query.friend);
    // Retrieve the new friend
    let friend = yield orm_1.User.byId(friendId);
    // If found, then add the new relationship/connection
    if (friend)
        new orm_1.Friend(req.session.user, friend).create();
    res.render('friend_add', Object.assign(Object.assign({}, req.session), { view: 'friend_add', friend }));
}));
exports.default = route;
//# sourceMappingURL=secured.js.map