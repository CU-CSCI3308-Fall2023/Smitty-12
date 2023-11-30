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

app.use('/resources/public/', express.static('./resources/public'));


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

app.get("/preferences", (req, res) => {
    res.render("pages/create");
});

app.get("/matches", (req, res) => {
    res.render("pages/matches");
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
    try {
        // Hash the password using bcrypt library
        const hash = await bcrypt.hash(req.body.password, 10);

        if (hash) {
            const query = `
                INSERT INTO users (
                    username, password, first_name, last_name, bio, 
                    location, age, photo_id, preferences_id
                ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            `;

            const queryParams = [
                req.body.username, hash, req.body.first_name, req.body.last_name,
                req.body.bio, req.body.location, req.body.age, req.body.photo_id,
                req.body.preferences_id
            ];

            await db.any(query, queryParams);
            res.redirect('/login');
        } else {
            console.log('Error hashing the password');
            res.redirect('/register');
        }
    } catch (error) {
        console.error('Error in registration:', error);
        res.redirect('/register');
    }
});

app.post('/make_profile', async (req, res) => {
    var bio = req.body.bio;
    var location = req.body.bio;
    var age = req.body.bio;
    var age_range = req.body.bio;
    var sex = req.body.bio;
    var pets = req.body.bio;
    var budget = req.body.bio;
    var quer = `insert into Account_Detail (bio,location,age) values ($1,$2,$3)`;
    const quer2 = await db.any(quer, [bio,location,age]);
    var querytwo = `insert into Preferences (age-range,sex,pets,budget) values ($4,$5,$6,$7)`;
    const query2 = await db.any(quer, [age_range,sex,pets,budget]);
    if (quer2.err || query2.err) {
        console.log("error bruh")
    }
    else {
        res.redirect('/discover')
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
// app.use(auth);

// app.get('/discover', (req, res) => {
//     axios({
//         url: `https://app.ticketmaster.com/discovery/v2/events.json`,
//         method: 'GET',
//         dataType: 'json',
//         params: {
//             "apikey": process.env.API_KEY,
//             "keyword": "Drake", //you can choose any artist/event here
//             "size": 10,
//         }
//     })
//         .then(results => {
//             // console.log(results.data._embedded.events[0]); // the results will be displayed on the terminal if the docker containers are running
//             // Send some parameters
//             res.render("pages/discover", { results: results.data._embedded.events })
//         })
//         .catch(error => {
//             console.log(error)
//             res.render("pages/discover", { results: [] })
//             // Handle errors
//         })
// });

app.get('/discover', async (req, res) => {
    try {
        const query = 'SELECT * FROM users';
        const allUsers = await db.any(query);

        // Render or send the allUsers data as needed
        res.render('pages/discover', { results: allUsers });
    } catch (error) {
        console.error('Error fetching all users:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/user/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const query = 'SELECT * FROM users WHERE user_id = $1';
        const user = await db.oneOrNone(query, [userId]);

        if (user) {
            // Render or send the user data as needed
            res.json(user);
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).send('Internal Server Error');
    }
});


// this section is for when someone likes you, you can see it and decide to like them back or not
app.get('/liked_you', async (req, res) => {
    const currentUserId = req.session.user.user_id;
  
    try {
      const likedYouUserIds = await db.any(
        `SELECT * FROM matches WHERE user_id_to = ${currentUserId}`
      );
  
      res.json({ likedYouUserIds });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  // this is for the matches section where theres a both users like each other.
app.get("/liked_back", async (req, res) => {
    const currentUserId = req.session.user.user_id;

    try {
        const likedYouUserIds = await db.any(
          `SELECT * user_id_from FROM matches WHERE user_id_to = ${currentUserId} AND user_id_to = ${currentUserId}`
        );
    
        res.json({ likedYouUserIds });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }

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