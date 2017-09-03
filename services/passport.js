const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

// this transforms the user id into an encryptde cookie id
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// this unencrypts the cookie id into a user id
passport.deserializeUser((id, done) => {
    done(null, id);
});


// tell passport to use the google stratgety with its config
passport.use( new GoogleStrategy(
    {
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback',
        proxy: true //tell google stratgety to trust a proxy if the redirection comes from one (like with heroku)
    },
    async (accesToken, refreshToken, profile, done) => {
        const existingUser = await User.findOne({googleId: profile.id});
        if(existingUser){
            console.log("IT EXISTS!");
            return done(null, existingUser);
        }
        
        let newUser = {
            googleId: profile.id
        };

        const user = await new User(newUser).save();
        done(null, user);
    }
));