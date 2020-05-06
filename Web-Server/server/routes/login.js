const router = require('express').Router();
const passport = require('passport');
const genPassword = require('../lib/password').genPassword;
const connection = require('../config/database');
const isAuth = require('./authMiddleware').isAuthLocal;
// const isAdmin = require('./authMiddleware').isAdminLocal;
const localUser = require('../models/userModel');

/**
 * -------------- POST ROUTES ----------------
 */

 router.post('/login', passport.authenticate('local', { failureRedirect: '/login-failure', successRedirect: 'login-success' }));

 router.post('/register', (req, res, next) => {
    const saltHash = genPassword(req.body.password);
    
    const salt = saltHash.salt;
    const hash = saltHash.hash;

    const newUser = new localUser({
        login: {
            username: req.body.user,
            hash: hash,
            salt: salt,
        }
    });

    newUser.save()
        .then((user) => {
            console.log(user);
        });

    res.redirect('/');
 });


 /**
 * -------------- GET ROUTES ----------------
 */

router.get('/', (req, res, next) => {
    res.send('<h1>Home</h1><p>Please <a href="/register">register</a></p>');
});

router.get('/protected-route', isAuth, (req, res, next) => {
    res.send('You made it to the route.');
});

// router.get('/admin-route', isAdmin, (req, res, next) => {
//     res.send('You made it to the admin route.');
// });


router.get('/logout', (req, res, next) => {
    req.logout();
    res.redirect('/protected-route');
});

router.get('/login-success', (req, res, next) => {
    res.send('<p>You successfully logged in. --> <a href="/protected-route">Go to protected route</a></p>');
});

router.get('/login-failure', (req, res, next) => {
    res.send('You entered the wrong password.');
});

module.exports = router;