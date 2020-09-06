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
import path from 'path';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import insecureSession from './sessions'
import { initialize } from './orm';
import guest from './routes/guest';
import unsecured from './routes/unsecured';
import secured from './routes/secured';
import { exit } from 'process';

const app = express();
let port = 3000;
let bind = '127.0.0.1';

//--------------------------------------------------------
// Parse command line parameters
//--------------------------------------------------------

let portArg = process.argv.indexOf('--port');
if (portArg != -1) {
    if (portArg + 1 >= process.argv.length) {
        console.error('No value supplied for --port parameter');
        exit(1);
    }
    port = parseInt(process.argv[portArg + 1]);
    if (isNaN(port) || port < 1) {
        console.error('Missing or invalid value supplied for --port parameter');
        exit(1);
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
app.set('views', path.join(process.cwd(), 'views'));
app.set('view engine', 'ejs');

// Parse cookies and HTML forms
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }));

// Use an insecure cookie-based session manager
app.use(insecureSession());

// Serve the static files
app.use(express.static('static'))

// Configure application routes
app.use(guest);
app.use(unsecured);
app.use(secured);

// Handle any uncaught errors from the application
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (err) {
        res.status(500).render('error', { ...req.session, view: 'error', error: err.toString()});
    } else
        next();
});

// Start the server
async function start() {
    // Initialize the in-memory database and sample data
    await initialize();

    // Start express
    app.listen(
        port,
        bind,
        () => {
            console.log(`Bunch of friends is running on interface ${bind}, port ${port}`);
            console.log(`Open your browser to http://localhost:${port}/`);
        }
    );
}

module.exports = { start };
