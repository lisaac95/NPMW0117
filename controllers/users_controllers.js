const url = require('../config/config'),
    mongo = require('mongodb').MongoClient;

module.exports = {
    getSignup : (req,res,next)=>{
        res.render('user/signup',{
            isAuthenticated : req.isAuthenticated(),
            user : req.user,
            title: 'Sign up'});
        console.log(`> Sirviendo signup`);
    },
    postSignup : (req,res,next)=>{
        mongo.connect(url.DB,(err,db)=>{
            var collection = db.collection('users');
            collection.insert(req.body,(err,data)=>{
                if (err) throw err; 
                console.log(data); 
            });
        });
        res.render("user/signup",{
            isAuthenticated : req.isAuthenticated(),
            user : req.user,
            title: 'Sign up'});
        return;        
    },
    getSignin : (req,res,next)=>{
        res.render('user/signin',{
        isAuthenticated : req.isAuthenticated(),
        user : req.user,
        title: 'Sign in'});
        console.log(`> Sirviendo signin`);
    },
    logout : (req,res,next)=>{
        req.logout();
        res.redirect('/');
    }
}; 