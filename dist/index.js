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
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const sessions_1 = __importDefault(require("./sessions"));
const orm_1 = require("./orm");
const guest_1 = __importDefault(require("./routes/guest"));
const unsecured_1 = __importDefault(require("./routes/unsecured"));
const secured_1 = __importDefault(require("./routes/secured"));
const process_1 = require("process");
const app = express_1.default();
let port = 3000;
let bind = '127.0.0.1';
//--------------------------------------------------------
// Parse command line parameters
//--------------------------------------------------------
let portArg = process.argv.indexOf('--port');
if (portArg != -1) {
    if (portArg + 1 >= process.argv.length) {
        console.error('No value supplied for --port parameter');
        process_1.exit(1);
    }
    port = parseInt(process.argv[portArg + 1]);
    if (isNaN(port) || port < 1) {
        console.error('Missing or invalid value supplied for --port parameter');
        process_1.exit(1);
    }
}
if (process.argv.includes('--public')) {
    bind = '0.0.0.0';
    console.error('');
    console.error('* DANGER! DANGER! DANGER! DANGER! DANGER! DANGER! DANGER!');
    console.error('* ');
    console.error('* The --public parameter was supplied.');
    console.error('* This server is accessible on your network.');
    console.error('* Your filesystem may be vulnerable.');
    console.error('* ');
    console.error('* DANGER! DANGER! DANGER! DANGER! DANGER! DANGER! DANGER!');
    console.error('');
}
console.log('Bunch of Friends is an intentionally insecure application.');
console.log('It should not be used in production.');
console.log('It should only be used behind a secure firewall.');
console.log();
//--------------------------------------------------------
// Start Express
//--------------------------------------------------------
// Use the EJS view engine
// Note: all the EJS views have been written to allow HTML injection
app.set('views', path_1.default.join(__dirname, '../views'));
app.set('view engine', 'ejs');
// Parse cookies and HTML forms
app.use(cookie_parser_1.default());
app.use(body_parser_1.default.urlencoded({ extended: false }));
// Use an insecure cookie-based session manager
app.use(sessions_1.default());
// Serve the static files
app.use(express_1.default.static('static'));
// Configure application routes
app.use(guest_1.default);
app.use(unsecured_1.default);
app.use(secured_1.default);
// Handle any uncaught errors from the application
app.use((err, req, res, next) => {
    if (err) {
        res.status(500).render('error', Object.assign(Object.assign({}, req.session), { view: 'error', error: err.toString() }));
    }
    else
        next();
});
// Start the server
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        // Initialize the in-memory database and sample data
        yield orm_1.initialize();
        // Start express
        app.listen(port, bind, () => {
            console.log(`Bunch of friends is running on interface ${bind}, port ${port}`);
            console.log(`Open your browser to http://localhost:${port}/`);
        });
    });
}
module.exports = { start };
//# sourceMappingURL=index.js.map