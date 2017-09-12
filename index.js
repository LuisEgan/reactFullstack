const exppress = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');

// CUSTOM MODULES
const keys = require('./config/keys');
const authRoutes = require('./routes/authRoutes');
const billingRoutes = require('./routes/billingRoutes');

// DB CONNECTION
mongoose.connect(keys.mongoURI);

// MODELS
require('./models/User');


// API SERVICES
require('./services/passport');

const app = exppress();

// EXPRESS MIDDLEWARES app.use()
app.use(bodyParser.json());

// PASSPORT COOKIES AUTH CONFIG
app.use(cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, //days * hours in day * minutes in hours * seconds in minutes * milliseconds in second
    keys: [keys.cookieKey]
}));
app.use(passport.initialize());
app.use(passport.session());

// AUTHENTICATION ROUTES
authRoutes(app);
// BILLING ROUTES
billingRoutes(app);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("Server up and ready to go!");
});

// process.on('SIGUSR2', () => { process.exit(0); });
// process.on('SIGHUP', () => { console.log("c ya"); process.exit(0); });