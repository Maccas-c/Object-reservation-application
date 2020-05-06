module.exports.isAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        //req.isAuthenticated() will return true if user is logged in
        next();
    } else {
        res.status(401).json({ msg: 'You are not authorized to view this resource' });
    }

}

module.exports.isAuthLocal = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).json({ msg: 'You are not authorized to view this resource' });
    }
}

// module.exports.isAdminLocal = (req, res, next) => {
//     if (req.isAuthenticated() && req.user.admin) {
//         next();
//     } else {
//         res.status(401).json({ msg: 'You are not authorized to view this resource because you are not an admin.' });
//     }
// }