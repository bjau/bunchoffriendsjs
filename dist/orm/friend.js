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
// A relationship between two users
// New Friends are created whenever a user "connects" with another user
class Friend {
    constructor(fromFriend, // User that performed the "connect" action
    toFriend, // User who was connected to
    id) {
        this.fromFriend = fromFriend;
        this.toFriend = toFriend;
        this.id = id;
    }
    // For a new Friend instance, inserts the user data into the database
    create() {
        return __awaiter(this, void 0, void 0, function* () {
            yield alasql_1.default.promise(`insert into friends (friendFrom, friendTo) 
             values (${this.fromFriend.id}, ${this.toFriend.id})`);
            // Retrieve the identifier of the new row
            this.id = alasql_1.default.autoval('friends', 'id');
        });
    }
}
exports.default = Friend;
//# sourceMappingURL=friend.js.map