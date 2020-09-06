/*
 * WARNING!
 *
 * This project is intentionally insecure.
 *
 * DO NOT use in production.
 *
 * It is designed for educational purposes - to teach common vulnerabilities in web applications.
 */

import express from 'express';
import { User } from './orm';

// Add session to the Express request type
declare global {
    namespace Express {
        export interface Request {
            session: {
                user?: User
            };
        }
    }
}

// Create middlware for an insecure session manager
const insecureSession = (): express.Handler => {

    // Session identifiers are just numbers that increment
    let sessionId = 1;

    // A session store
    const sessions: {[id: number]: any} = {};
    
    return (req: express.Request, res: express.Response, next: express.NextFunction) => {
        // Do we have a cookie?
        if (req.cookies?.session in sessions) {
            // If so, retrieve from the local session store
            req.session = sessions[req.cookies.session];
        } else {
            // Otherwise increment the session counter and initialize the session
            const id = sessionId++;
            res.cookie('session', id);
            sessions[id] = {};
            req.session = sessions[id];
        }
        next();
    };
};

export default insecureSession;