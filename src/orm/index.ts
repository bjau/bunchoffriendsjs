/*
 * WARNING!
 *
 * This project is intentionally insecure.
 *
 * DO NOT use in production.
 *
 * It is designed for educational purposes - to teach common vulnerabilities in web applications.
 */

//--------------------------------------------------------
// A terribly insecure persistence layer
// The API is inspired by simple ORM frameworks
// Note: SQL is not properly escaped, script injection is possible
// The AlaSQL in-memory database is used:
//     Changes do not persist between sessions
//     The database is not secure and queries can read the filesystem
// Note: AlaSQL queries can read and write files
//--------------------------------------------------------

import initialize from './initialize';
import Post from './post';
import User from './user';
import Friend from './friend';
import raw from './raw';

export { initialize, raw, User, Friend, Post };