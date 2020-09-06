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

declare global {
    namespace Express {
        export interface Request {
            session: {
                user?: User
            };
        }
    }
}

const insecureSession = () => {

    let sessionId = 1;
    let sessions: {[id: number]: any} = {};
    
    return (req: express.Request, res: express.Response, next: express.NextFunction) => {
        if (req.cookies?.session in sessions) {
            req.session = sessions[req.cookies.session];
        } else {
            let id = sessionId++;
            res.cookie('session', id);
            sessions[id] = {};
            req.session = sessions[id];
        }
        next();
    };
}

export default insecureSession;