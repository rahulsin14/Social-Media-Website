const passport=require('passport');
const GoogleStrategy=require('passport-google-oauth').OAuth2Strategy;
const crypto=require('crypto');
const User=require('../models/user');

passport.use(new GoogleStrategy({
    clientID: "486942836941-4ihr4a4hfrvfuoo125oq5sd9heq57tfn.apps.googleusercontent.com",
    clientSecret: "4qj6nqeZ_NX6YlnhfqR7o50l",
    callbackURL: "http://localhost:8000/users/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOne({email:profile.emails[0].value}).exec(function(err,user){
        if(err){
            console.log('error in google strategy',err);return;
        }
        console.log(profile);
        if(user){
            return done(null,user);
        }else{
            User.create({
                name:profile.displayName,
                email:profile.emails[0].value,
                password:crypto.randomBytes(20).toString('hex')

            },function(err,user){
                if(err){
                    console.log('error in google strategy',err);return;
                }
                return done(null,user);
            });
        }
    })
  }
));
module.exports=passport;