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
Object.defineProperty(exports, "__esModule", { value: true });
// Create middlware for an insecure session manager
const insecureSession = () => {
    // Session identifiers are just numbers that increment
    let sessionId = 1;
    // A session store
    const sessions = {};
    return (req, res, next) => {
        var _a;
        // Do we have a cookie?
        if (((_a = req.cookies) === null || _a === void 0 ? void 0 : _a.session) in sessions) {
            // If so, retrieve from the local session store
            req.session = sessions[req.cookies.session];
        }
        else {
            // Otherwise increment the session counter and initialize the session
            const id = sessionId++;
            res.cookie('session', id);
            sessions[id] = {};
            req.session = sessions[id];
        }
        next();
    };
};
exports.default = insecureSession;
//# sourceMappingURL=sessions.js.map