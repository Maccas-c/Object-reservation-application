const express = require("express");
const passport = require("passport");
const oauth = require("oauth");
const userModel = require("../models/userModel");
const isAuth = require("./authMiddleware").isAuth;
const router = express.Router();

router.get("/api/loginUsos", function (req, res) {
  if (req.user) {
    res.status(200).json({
      id: req.user.id,
      name: req.user.name,
      surname: req.user.surname,
      isActive: req.user.isActive,
    });
  } else {
    res.status(404).end();
  }
});

router.get("/api/loginUsos/connect", passport.authenticate("oauth"));

router.get(
  "/api/loginUsos/callback",
  passport.authenticate("oauth", {
    successRedirect: "/api/loginUsos",
    failureRedirect: "/api/loginUsos/connect",
  })
);

router.get("/api/loginUsos/logout", function (req, res) {
  req.session.destroy(function (err) {
    if (err) return res.status(404);
    res
      .status(200)
      .redirect(
        "https://usosweb.amu.edu.pl/kontroler.php?_action=logowaniecas/wyloguj"
      );
  });
});

module.exports = router;
