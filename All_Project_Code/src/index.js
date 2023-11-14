// *****************************************************
// <!-- Section 1 : Import Dependencies -->
// *****************************************************

const express = require('express'); // To build an application server or API
const app = express();
const pgp = require('pg-promise')(); // To connect to the Postgres DB from the node server
const bodyParser = require('body-parser');
const session = require('express-session'); // To set the session object. To store or access session data, use the `req.session`, which is (generally) serialized as JSON by the store.
const bcrypt = require('bcrypt'); //  To hash passwords
const axios = require('axios'); // To make HTTP requests from our server. We'll learn more about it in Part B.

// *****************************************************
// <!-- Section 2 : Connect to DB -->
// *****************************************************

// database configuration
const dbConfig = {
    host: 'db', // the database server
    port: 5432, // the database port
    database: process.env.POSTGRES_DB, // the database name
    user: process.env.POSTGRES_USER, // the user account to connect with
    password: process.env.POSTGRES_PASSWORD, // the password of the user account
};

const db = pgp(dbConfig);

// test your database
db.connect()
    .then(obj => {
        console.log('Database connection successful'); // you can view this message in the docker compose logs
        obj.done(); // success, release the connection;
    })
    .catch(error => {
        console.log('ERROR:', error.message || error);
    });

// *****************************************************
// <!-- Section 3 : App Settings -->
// *****************************************************

app.set('view engine', 'ejs'); // set the view engine to EJS
app.use(bodyParser.json()); // specify the usage of JSON for parsing request body.

// initialize session variables
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        saveUninitialized: false,
        resave: false,
    })
);

app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

// *****************************************************
// <!-- Section 4 : API Routes -->
// *****************************************************

// TODO - Include your API routes here

// app.get('/home', (req, res) => {
//     res.redirect('/anotherRoute'); //this will call the /anotherRoute route in the API
// });

app.get("/", (req, res) => {
    res.render("pages/login");
});

app.get("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    res.render("pages/login");
});

//Register
app.get("/register", (req, res) => {
    res.render("pages/register");
});

// Login submission
app.post("/login", async (req, res) => {
    const userq = 'select * from users where username = $1'
    const userm = await db.any(userq, [req.body.username]);
    if (userm.length == 0) {
        res.redirect("./register");
    }
    else if (userm.error) {
        res.render("pages/login", { message: "wrong username or password" });
    }
    else {
        req.session.user = userm[0];
        req.session.save();
        res.redirect("/discover");
    }

});

// Register
app.post('/register', async (req, res) => {
    //hash the password using bcrypt library
    const hash = await bcrypt.hash(req.body.password, 10);
    if (hash) {
        var quer = `insert into users (username,password) values ($1,$2)`;
        const quer2 = await db.any(quer, [req.body.username, hash]);
        if (quer2.err) {
            res.redirect('/register')
        }
        else {
            res.redirect('/login')
        }
    }
    else {
        console.log('error hashing the browns')
    }
});


// Authentication Middleware.
const auth = (req, res, next) => {
    if (!req.session.user) {
        // Default to register page.
        return res.redirect('/register');
    }
    next();
};

// Authentication Required
app.use(auth);

app.get('/discover', (req, res) => {
    axios({
        url: `https://app.ticketmaster.com/discovery/v2/events.json`,
        method: 'GET',
        dataType: 'json',
        params: {
            "apikey": process.env.API_KEY,
            "keyword": "Drake", //you can choose any artist/event here
            "size": 10,
        }
    })
        .then(results => {
            // console.log(results.data._embedded.events[0]); // the results will be displayed on the terminal if the docker containers are running
            // Send some parameters
            res.render("pages/discover", { results: results.data._embedded.events })
        })
        .catch(error => {
            console.log(error)
            res.render("pages/discover", { results: [] })
            // Handle errors
        })
});


app.get("/logout", (req, res) => {
    req.session.destroy();
    res.render("pages/logout");
});

// *****************************************************
// <!-- Section 5 : Start Server-->
// *****************************************************
// starting the server and keeping the connection open to listen for more requests
module.exports = app.listen(3000);
console.log('Server is listening on port 3000');