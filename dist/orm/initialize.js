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
const friend_1 = __importDefault(require("./friend"));
const post_1 = __importDefault(require("./post"));
// Initialize the database with a schema and sample data
// Run once on system startup
function initialize() {
    return __awaiter(this, void 0, void 0, function* () {
        // Create the database schema
        yield alasql_1.default.promise(`create table users(
            id serial primary key not null autoincrement,
            username text unique,
            password text,
            fullName text
        );
        
        create table friends(
            id serial primary key not null autoincrement,
            friendFrom integer,
            friendTo integer,
            constraint friendFrom_fk foreign key (friendFrom) references users(id),
            constraint friendTo_fk foreign key (friendTo) references users(id)
        );
        
        create table posts(
            id serial primary key not null autoincrement,
            creator integer,
            message text,
            creationDate Date,
            likes integer,
            constraint creator_fk foreign key (creator) references users(id)
        )`);
        // Populate the database with sample data
        let carol = new user_1.default('carol', 'password', 'Carol');
        let mike = new user_1.default('mike', 'qwerty', 'Mike');
        let alice = new user_1.default('alice', '123456', 'Alice');
        let sam = new user_1.default('sam', 'iloveyou', 'Sam');
        let greg = new user_1.default('greg', 'bravo', 'Greg');
        let peter = new user_1.default('peter', 'volcano', 'Peter');
        let bobby = new user_1.default('bobby', 'racecar', 'Bobby');
        let marcia = new user_1.default('marcia', 'davyjones', 'Marcia');
        let jan = new user_1.default('jan', 'glass', 'Jan');
        let cindy = new user_1.default('cindy', 'thindy', 'Cindy');
        yield carol.create();
        yield mike.create();
        yield alice.create();
        yield sam.create();
        yield greg.create();
        yield peter.create();
        yield bobby.create();
        yield marcia.create();
        yield jan.create();
        yield cindy.create();
        yield new friend_1.default(marcia, carol).create();
        yield new friend_1.default(marcia, jan).create();
        yield new friend_1.default(jan, marcia).create();
        yield new friend_1.default(jan, alice).create();
        yield new friend_1.default(jan, cindy).create();
        yield new friend_1.default(cindy, jan).create();
        yield new friend_1.default(cindy, mike).create();
        yield new friend_1.default(carol, marcia).create();
        yield new friend_1.default(carol, greg).create();
        yield new friend_1.default(carol, alice).create();
        yield new friend_1.default(alice, carol).create();
        yield new friend_1.default(alice, jan).create();
        yield new friend_1.default(alice, peter).create();
        yield new friend_1.default(alice, mike).create();
        yield new friend_1.default(mike, alice).create();
        yield new friend_1.default(mike, cindy).create();
        yield new friend_1.default(mike, bobby).create();
        yield new friend_1.default(greg, carol).create();
        yield new friend_1.default(greg, peter).create();
        yield new friend_1.default(peter, greg).create();
        yield new friend_1.default(peter, alice).create();
        yield new friend_1.default(peter, bobby).create();
        yield new friend_1.default(bobby, peter).create();
        yield new friend_1.default(bobby, mike).create();
        yield new friend_1.default(alice, sam).create();
        yield new friend_1.default(sam, alice).create();
        yield new post_1.default(mike, "It has been a busy week", new Date("2020-1-2 09:00:00"), 5).create();
        yield new post_1.default(mike, "Finished designs for new building.", new Date("2020-1-4 16:15:00"), 2).create();
        yield new post_1.default(mike, "Received Father of the Year award. Wow!", new Date("2020-1-5 12:33:00"), 5).create();
        yield new post_1.default(carol, "Enjoying a nightcap with hubby", new Date("2020-1-5 18:42:00"), 5).create();
        yield new post_1.default(carol, "Teaching the boys to dance", new Date("2020-1-8 4:55:00"), 4).create();
        yield new post_1.default(alice, "Cleaning, cleaning. Always cleaning.", new Date("2020-1-1 13:21:00"), 3).create();
        yield new post_1.default(alice, "Cooking up a storm in the kitchen", new Date("2020-1-2 11:49:00"), 2).create();
        yield new post_1.default(sam, "At the meat market", new Date("2020-1-5 08:01:00"), 2).create();
        yield new post_1.default(sam, "Thinking of buying a new refrigerator", new Date("2020-1-6 12:05:00"), 1).create();
        yield new post_1.default(greg, "Bobby is so immature", new Date("2020-1-2 16:59:00"), 3).create();
        yield new post_1.default(greg, "Another school day. :(", new Date("2020-1-4 07:32:00"), 5).create();
        yield new post_1.default(greg, "Listening to the new Jonny Bravo single", new Date("2020-1-7 17:38:00"), 8).create();
        yield new post_1.default(peter, "Saved a life today", new Date("2020-1-3 18:05:00"), 1).create();
        yield new post_1.default(peter, "Am I dull?", new Date("2020-1-3 18:22:00"), 0).create();
        yield new post_1.default(bobby, "Clairol #43. Ugh!", new Date("2020-1-5 10:10:00"), 4).create();
        yield new post_1.default(bobby, "Feeling afraid of heights", new Date("2020-1-7 13:52:00"), 0).create();
        yield new post_1.default(marcia, "I could listen to Davy Jones all night", new Date("2020-1-7 20:19:00"), 0).create();
        yield new post_1.default(jan, "Feeling low", new Date("2020-1-8 09:15:00"), 0).create();
        yield new post_1.default(cindy, "I have just heard an amazing secret", new Date("2020-1-11 13:11:00"), 0).create();
    });
}
exports.default = initialize;
//# sourceMappingURL=initialize.js.map