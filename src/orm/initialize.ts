/*
 * WARNING!
 *
 * This project is intentionally insecure.
 *
 * DO NOT use in production.
 *
 * It is designed for educational purposes - to teach common vulnerabilities in web applications.
 */

import alasql from 'alasql';
import User from './user';
import Friend from './friend';
import Post from './post';

// Initialize the database with a schema and sample data
// Run once on system startup
export default async function initialize(): Promise<void> {
    // Create the database schema
    await alasql.promise(
        `create table users(
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
        )`
    );

    // Populate the database with sample data
    const carol = new User('carol', 'password', 'Carol');
    const mike = new User('mike', 'qwerty', 'Mike');
    const alice = new User('alice', '123456', 'Alice');
    const sam = new User('sam', 'iloveyou', 'Sam');
    const greg = new User('greg', 'bravo', 'Greg');
    const peter = new User('peter', 'volcano', 'Peter');
    const bobby = new User('bobby', 'racecar', 'Bobby');
    const marcia = new User('marcia', 'davyjones', 'Marcia');
    const jan = new User('jan', 'glass', 'Jan');
    const cindy = new User('cindy', 'thindy', 'Cindy');
    
    await carol.create();
    await mike.create();
    await alice.create();
    await sam.create();
    await greg.create();
    await peter.create();
    await bobby.create();
    await marcia.create();
    await jan.create();
    await cindy.create();

    await new Friend(marcia, carol).create();
    await new Friend(marcia, jan).create();
    await new Friend(jan, marcia).create();
    await new Friend(jan, alice).create();
    await new Friend(jan, cindy).create();
    await new Friend(cindy, jan).create();
    await new Friend(cindy, mike).create();
    await new Friend(carol, marcia).create();
    await new Friend(carol, greg).create();
    await new Friend(carol, alice).create();
    await new Friend(alice, carol).create();
    await new Friend(alice, jan).create();
    await new Friend(alice, peter).create();
    await new Friend(alice, mike).create();
    await new Friend(mike, alice).create();
    await new Friend(mike, cindy).create();
    await new Friend(mike, bobby).create();
    await new Friend(greg, carol).create();
    await new Friend(greg, peter).create();
    await new Friend(peter, greg).create();
    await new Friend(peter, alice).create();
    await new Friend(peter, bobby).create();
    await new Friend(bobby, peter).create();
    await new Friend(bobby, mike).create();
    await new Friend(alice, sam).create();
    await new Friend(sam, alice).create();


    await new Post(mike, 'It has been a busy week', new Date('2020-1-2 09:00:00'), 5).create();
    await new Post(mike, 'Finished designs for new building.', new Date('2020-1-4 16:15:00'), 2).create();
    await new Post(mike, 'Received Father of the Year award. Wow!', new Date('2020-1-5 12:33:00'), 5).create();
    await new Post(carol, 'Enjoying a nightcap with hubby', new Date('2020-1-5 18:42:00'), 5).create();
    await new Post(carol, 'Teaching the boys to dance', new Date('2020-1-8 4:55:00'), 4).create();
    await new Post(alice, 'Cleaning, cleaning. Always cleaning.', new Date('2020-1-1 13:21:00'), 3).create();
    await new Post(alice, 'Cooking up a storm in the kitchen', new Date('2020-1-2 11:49:00'), 2).create();
    await new Post(sam, 'At the meat market', new Date('2020-1-5 08:01:00'), 2).create();
    await new Post(sam, 'Thinking of buying a new refrigerator', new Date('2020-1-6 12:05:00'), 1).create();
    await new Post(greg, 'Bobby is so immature', new Date('2020-1-2 16:59:00'), 3).create();
    await new Post(greg, 'Another school day. :(', new Date('2020-1-4 07:32:00'), 5).create();
    await new Post(greg, 'Listening to the new Jonny Bravo single', new Date('2020-1-7 17:38:00'), 8).create();
    await new Post(peter, 'Saved a life today', new Date('2020-1-3 18:05:00'), 1).create();
    await new Post(peter, 'Am I dull?', new Date('2020-1-3 18:22:00'), 0).create();
    await new Post(bobby, 'Clairol #43. Ugh!', new Date('2020-1-5 10:10:00'), 4).create();
    await new Post(bobby, 'Feeling afraid of heights', new Date('2020-1-7 13:52:00'), 0).create();
    await new Post(marcia, 'I could listen to Davy Jones all night', new Date('2020-1-7 20:19:00'), 0).create();
    await new Post(jan, 'Feeling low', new Date('2020-1-8 09:15:00'), 0).create();
    await new Post(cindy, 'I have just heard an amazing secret', new Date('2020-1-11 13:11:00'), 0).create();
}