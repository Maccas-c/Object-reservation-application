const express = require("express");
const passport = require("passport");
const oauth = require("oauth");
const userModel = require("../models/userModel");
const isAuth = require("./authMiddleware").isAuth;
const router = express.Router();

router.get("/loginUsos", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/loginUsos/connect", passport.authenticate("oauth"));

router.get(
  "/loginUsos/callback",
  passport.authenticate("oauth", {
    successRedirect: "/",
    failureRedirect: "/loginUsos/brakDostepu",
  })
);

router.get("/loginUsos/logout", function (req, res) {
  req.session.destroy(function (err) {
    res.redirect("/");
  });
});

module.exports = router;
