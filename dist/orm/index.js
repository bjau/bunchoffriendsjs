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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = exports.Friend = exports.User = exports.raw = exports.initialize = void 0;
//--------------------------------------------------------
// A terribly insecure persistence layer
// The API is inspired by simple ORM frameworks
// Note: SQL is not properly escaped, script injection is possible
// The AlaSQL in-memory database is used:
//     Changes do not persist between sessions
//     The database is not secure and queries can read the filesystem
// Note: AlaSQL queries can read and write files
//--------------------------------------------------------
const initialize_1 = __importDefault(require("./initialize"));
exports.initialize = initialize_1.default;
const post_1 = __importDefault(require("./post"));
exports.Post = post_1.default;
const user_1 = __importDefault(require("./user"));
exports.User = user_1.default;
const friend_1 = __importDefault(require("./friend"));
exports.Friend = friend_1.default;
const raw_1 = __importDefault(require("./raw"));
exports.raw = raw_1.default;
//# sourceMappingURL=index.js.map