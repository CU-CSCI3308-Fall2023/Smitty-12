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
    res.render("pages/home");
});

app.get("/home", (req, res) => {
    res.render("pages/home");
});

app.get("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    res.render("pages/login");
});

app.get("/preferences", (req, res) => {
    res.render("pages/create");
});

app.get("/matches", async (req, res) => {
    var likes_you_data_original = await db.any(`select distinct users.username, users.user_id, users.first_name, users.last_name from users inner join matches ON matches.liker_user_id=users.user_id where matches.liked_user_id=${req.session.user.user_id}`);
    let matches = await db.any(`SELECT DISTINCT u.username, u.user_id, u.first_name, u.last_name FROM users u WHERE u.user_id IN ( SELECT DISTINCT m1.liker_user_id AS user_id FROM matches m1 INNER JOIN matches m2 ON m1.liker_user_id = m2.liked_user_id AND m1.liked_user_id = m2.liker_user_id WHERE (m1.liked_user_id = ${req.session.user.user_id} AND m1.liker_user_id = u.user_id) AND (m2.liker_user_id = ${req.session.user.user_id} AND m2.liked_user_id = u.user_id) )`)

    var likes_you_data = []

    likes_you_data_original.forEach(data_entry => {
        var append = true
        matches.forEach(data => {
            if (data.user_id === data_entry.user_id) {
                console.log("ALREADU MATCHES")
                append = false
            }
        })

        if (append) {
            likes_you_data.push(data_entry)
        }
    })

    console.log(likes_you_data);
    console.log(matches);


    res.render("pages/matches", data={likes_you: likes_you_data, matched_with: matches});
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
        const age = req.body.age;
        if (hash) {
            // Fetch the current maximum user_id
            const maxUserId = await db.one('SELECT MAX(user_id) FROM users');
            const newUserId = maxUserId.max + 1;

            // Insert into preferences using the new preferences_id
            const queryTwo = `
                INSERT INTO preferences (preferences_id, age_range, sex, pets, budget)
                VALUES ($1, $2, $3, $4, $5)
            `;
            const queryTwoParams = [newUserId, age, "nopref", 0, 1000];

            await db.any(queryTwo, queryTwoParams);

            // Insert into users with the new user_id and preferences_id
            const query = `
                INSERT INTO users (
                    user_id, username, password, first_name, last_name, bio, 
                    location, age, photo_id, preferences_id
                ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
            `;

            const queryParams = [
                newUserId, // Use the new user_id here
                req.body.username, hash, req.body.first_name, req.body.last_name,
                req.body.bio, req.body.location, req.body.age, req.body.photo_id,
                newUserId  // Use the new user_id here
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




// app.post('/make_profile', async (req, res) => {
//     // Assuming you have a session with user information, and the user ID is stored in req.session.userId
//     var userId = req.session.userId;

//     var age_range = req.body.age_range;
//     var sex = req.body.sex;
//     var pets = req.body.pets;
//     var budget = req.body.budget;

//     try {
//         // Step 1: Insert preferences
//         var preferencesQuery = `
//             INSERT INTO Preferences (age_range, sex, pets, budget)
//             VALUES ($1, $2, $3, $4)
//             RETURNING preferences_id
//         `;

//         const preferencesResult = await db.one(preferencesQuery, [age_range, sex, pets, budget]);
//         var preferencesId = preferencesResult.preferences_id;

//         // Step 2: Update user with preferences_id
//         var updateUserQuery = `
//             UPDATE Users
//             SET preferences_id = $1
//             WHERE user_id = $2
//         `;

//         await db.none(updateUserQuery, [preferencesId, userId]);

//         res.redirect('/discover');
//     } catch (error) {
//         console.error("Error:", error);
//         res.status(500).send("Internal Server Error");
//     }
// });

app.post('/update_preferences', async (req, res) => {
    const { ageRange, sex, pets, budget } = req.body;
    const currentUserId = req.session.user.user_id;

    try {
        // Update preferences in the preferences table for the current user
        await db.none(
            `UPDATE preferences SET age_range = $1, sex = $2, pets = $3, budget = $4 WHERE preferences_id = (SELECT preferences_id FROM users WHERE user_id = $5)`,
            [ageRange, sex, pets, budget, currentUserId]
        );

        res.redirect('/preferences');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
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

app.get('/users', async (req, res) => {
    try {
        const query = 'SELECT * FROM users LEFT JOIN preferences ON users.preferences_id = preferences.preferences_id';
        const usersWithPrefs = await db.any(query);

        console.log(usersWithPrefs);  // Add this line to log the data

        res.render('pages/users', { results: usersWithPrefs });
    } catch (error) {
        console.error('Error fetching all users:', error);
        res.status(500).send('Internal Server Error');
    }
});



app.get('/discover', async (req, res) => {
    const currentUserId = req.session.user.user_id;
    try {
        // Append a timestamp to the API request URL
        const timestamp = new Date().getTime();
        const apiUrl = `https://randomuser.me/api/?results=100&timestamp=${timestamp}`;

        // Make the AJAX request to the modified URL
        const response = await axios.get(apiUrl);

        // Extract the data from the response
        const userData = response.data.results;
        console.log(userData);

        // Extract data from preferences
        const userPreferences = await db.oneOrNone('SELECT * FROM preferences WHERE preferences_id =  (SELECT preferences_id FROM users WHERE user_id = $1)', [currentUserId]); 
        console.log(userPreferences);
        console.log(currentUserId);

        // Send the data back to the client
        res.render('pages/discover', {preferences: userPreferences, results: userData});
      
        
    } catch (error) {
        // Handle any errors that might occur during the request
        console.error('Error fetching data:', error.message);
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

app.post('/save_and_refresh',async(req,res) => {
    try {
        /*

        Database Structure: 
            CREATE TABLE IF NOT EXISTS matches (
            liked_user_id INT,
            liker_user_id INT
            );
        
        Person liking: liker_id
        Person being liked: liked_id

        res.session.user.id

        */

        console.log("Liked id: ", req.body.liked_id)
        console.log(req.session.user)

        let liked_id = req.body.liked_id
        let liker_id = req.session.user.user_id

        await db.query(`INSERT INTO matches (liked_user_id, liker_user_id) values ( ${liked_id} , ${liker_id})`)
        res.redirect('/users')
    } catch (error) {
        console.log(error)
    }
})

// this section is for when someone likes you, you can see it and decide to like them back or not
app.get('/liked_you', async (req, res) => {
    const currentUserId = req.session.user.user_id;
  
    try {
      const likedYouUserIds = await db.any(
        `SELECT * FROM matches WHERE liker_user_id = ${currentUserId}`
      )
  
      res.render('pages/matches', { results: likedYouUserIds });
      console.log("YOULIKED", likedYouUserIds);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  // this is for the matches section where theres a both users like each other.
  app.get("/liked_back", async (req, res) => {
    const currentUserId = req.session.user.user_id;    

    try {
        const youLiked = await db.any(
            `SELECT * FROM matches WHERE liker_user_id = ${currentUserId}`
          )

        const likedYouUserIds = await db.any(
            `SELECT liker_user_id FROM matches WHERE liked_user_id = $1`,
            [currentUserId]
        );

        const intersection = youLiked.filter(element => likedYouUserIds.includes(element))
        console.log("INT", intersection)
        console.log("LIKED YOU", likedYouUserIds);
        `SELECT * FROM users WHERE user_id in `
        res.render('pages/matches', { results: likedYouUserIds });
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