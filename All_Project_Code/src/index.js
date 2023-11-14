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
app.get('/', (req, res) => {
    res.redirect('/login'); //this will call the /anotherRoute route in the API
  });
  
app.get('/login', (req, res) => {
    res.render('pages/login');
  });

app.get('/register', async (req, res) => {
    res.render('pages/register');
  });

  app.post('/register', async (req, res) => {

    console.log('username: ', req.body.username);
    console.log('password ', req.body.password);
    // Hash the password using bcrypt library
    const hash = await bcrypt.hash(req.body.password, 10);
    console.log('hash: ', hash);
  
    try {
      // Insert the username and hashed password into the 'users' table if the username is not already in the table.
      // This uses an "INSERT ON CONFLICT" query to handle duplicates.
      await db.none(
        'INSERT INTO users (username, password) VALUES ($1, $2) ON CONFLICT (username) DO NOTHING',
        [req.body.username, hash]
      );
      // Redirect to GET /login route page after successful insertion
      await res.redirect('/login');
      console.log('now redirecting to login with username: ');
    } 
    catch (error) {
      // Handle the case where the insertion fails
      console.error('Error inserting into the database:', error);
      // Redirect to GET /register route or display an error page
      res.redirect('/register'); 
      console.log('now redirecting to register');
    }
  });
  
  app.post('/login', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      // Find the user from the 'users' table based on the entered username
      const user = await db.any('SELECT * FROM users WHERE username = $1', username);
  
      if (user.length === 0) {
        // If the user is not found in the database, redirect to the registration page.
        res.redirect('/register');
      } else {
        // Use bcrypt.compare to compare the entered password with the stored hashed password.
        const passwordMatch = await bcrypt.compare(password, user[0].password);
  
        if (passwordMatch) {
          // If the password matches, save the user details in the session.
          req.session.user = user[0];
          req.session.save();
  
          // Redirect to the /discover route or any other authenticated route.
          res.redirect('/discover');
        } else {
          // If the password is incorrect, throw an error.
          throw new Error('Incorrect username or password.');
        }
      }
    } catch (error) {
      console.error('Database error:', error);
      // Send an appropriate message to the user and render the login.ejs page.
      res.render('pages/login', { error: 'An error occurred while processing your request.' });
    }
  });

    // Authentication Middleware.
    const auth = (req, res, next) => {
      if (!req.session.user) {
        // Default to login page.
        return res.redirect('/login');
      }
      next();
    };

    // Authentication Required
    app.use(auth);
  

app.get("/discover", (req,res) => {
  axios({
      url: `https://app.ticketmaster.com/discovery/v2/events.json`,
      method: 'GET',
      dataType: 'json',
      headers: {
        'Accept-Encoding': 'application/json',
      },
      params: {
        apikey: process.env.API_KEY,
        keyword: 'Tyler Childers', //you can choose any artist/event here
        size: 6 // you can choose the number of events you would like to return
      },
    })
      .then(results => {
        console.log(results.data); // the results will be displayed on the terminal if the docker containers are running // Send some parameters
        res.render('pages/discover', {results:results.data._embedded.events});
        
      })
      .catch(error => {
        console.error('Ticketmaster Error: failed to retrieve information', error);
        // Handle errors
  });
})


  app.get("/logout", (req, res) => {
    req.session.destroy();
    res.render("pages/logout");
  });

// *****************************************************
// <!-- Section 5 : Start Server-->
// *****************************************************
// starting the server and keeping the connection open to listen for more requests
app.listen(3000);
console.log('Server is listening on port 3000');