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
    }, (accesToken, refreshToken, profile, done) => {
        User.findOne({googleId: profile.id}).then(existingUser =>{
            if(existingUser){
                console.log("IT EXISTS!");
                done(null, existingUser);
            }
            else{
                let newUser = {
                    googleId: profile.id
                };

                new User(newUser)
                    .save()
                    .then(user => {
                        done(null, user);
                    });
            }
        });
    }
));