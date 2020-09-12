# Bunch of Friends JS

An intentionally insecure web application.

For full information please see my [blog post](https://www.benjaminjohnston.com.au/intentionallyinsecurejs).

To run:
- Ensure a recent version of Node.js is installed
- Ensure you have no services running on port 3000
- Run `npx bjau/bunchoffriendsjs` and open your browser to [http://localhost:3000/](http://localhost:3000/) (the npx command will automatically download and run a temporary installation)

Do not use in production.

BunchOfFriendsJS is an intentionally insecure social network to teach web security. It has been developed for Node.js. It is designed to have many of the [OWASP Top 10](https://owasp.org/www-project-top-ten/) vulnerabilities.

**Options:** Use `npx bjau/bunchoffriendsjs --port 4000` to specify a different port (i.e., port 4000 in this case).

**Security:** The application is insecure. For safety, it will bind only to the loopback interface 127.0.0.1. To bind to all interfaces (0.0.0.0) and allow remote access, use `npx bjau/bunchoffriendsjs --public` to launch the web application.

[Creative Commons Zero / Public Domain license](https://creativecommons.org/publicdomain/zero/1.0/)

