const exppress = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');

// CUSTOM MODULES
const keys = require('./config/keys');
const authRoutes = require('./routes/authRoutes');

// MODELS
require('./models/User');

// API SERVICES
require('./services/passport');

// DB CONNECTION
mongoose.connect(keys.mongoURI);

const app = exppress();

// PASSPORT COOKIES AUTH CONFIG
app.use(cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, //days * hours in day * minutes in hours * seconds in minutes * milliseconds in second
    keys: [keys.cookieKey]
}));
app.use(passport.initialize());
app.use(passport.session());

// AUTHENTICATION ROUTES
authRoutes(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("Server up and ready to go!");
});

process.on('SIGHUP', () => { console.log("c ya"); process.exit(0); });