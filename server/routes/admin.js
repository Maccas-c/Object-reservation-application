const express = require("express");
const router = express.Router();
const isAuth = require("./authMiddleware").isAuth;
const authRole = require("./authMiddleware").authRole;
const userModel = require("../models/userModel");

router.get(
  "/api/admin",
  isAuth,
  authRole(process.env.ROLE_ADMIN),
  (req, res) => {
    res.send("admin");
  }
);

router.patch(
  "/api/admin/modify/:userId",
  isAuth,
  authRole(process.env.ROLE_ADMIN),
  async function (req, res) {
    try {
      const updatedUser = await userModel.updateOne(
        {
          _id: req.params.userId,
        },
        {
          $set: {
            isStudent: req.body.isStudent,
          },
        }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(404).json(err);
    }
  }
);
module.exports = router;
