const localStrategy = require('passport-local').Strategy,
    mongo = require('mongodb').MongoClient,
    url = require('../config/config');

module.exports = (passport)=>{

    passport.serializeUser((user,done)=>{
        done(null,user);
    });

    passport.deserializeUser((obj,done)=>{
        done(null,obj);
    });

    passport.use(new localStrategy({
        passReqToCallback : true
    },(req,nombre,password,done)=>{
        mongo.connect(url.DB,(err,db)=>{
            if(err) throw err;
            var collection = db.collection('users');
            collection.find({nombre : nombre}).toArray((err,user)=>{
                if(err) throw err;
                if(password === user[0].password){
                    db.close();
                    return done(null,user);
                }
                return done(null,false);
            }); 
        });
    }
    ));

};