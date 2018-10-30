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
mongoose.Promise = global.Promise;
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


// MAKE REACT WORK IN DEPLOYMENT
if(process.env.NODE_ENV === 'production') {
    // Express will serve production assets (main.js main.css etc)
    // This says that if any GET request comes in for something and is not understood what is looking for, look for it at client/build
    app.use(exppress.static('client/build'));

    // Express will serve index.html if the route is not recognized (not even in the client/build dir)
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("Server up and ready to go!");
});

// process.on('SIGUSR2', () => { process.exit(0); });
// process.on('SIGHUP', () => { console.log("c ya"); process.exit(0); });