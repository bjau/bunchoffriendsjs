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
const insecureSession = () => {
    let sessionId = 1;
    let sessions = {};
    return (req, res, next) => {
        var _a;
        if (((_a = req.cookies) === null || _a === void 0 ? void 0 : _a.session) in sessions) {
            req.session = sessions[req.cookies.session];
        }
        else {
            let id = sessionId++;
            res.cookie('session', id);
            sessions[id] = {};
            req.session = sessions[id];
        }
        next();
    };
};
exports.default = insecureSession;
//# sourceMappingURL=sessions.js.map