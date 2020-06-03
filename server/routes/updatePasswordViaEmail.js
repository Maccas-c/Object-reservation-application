const express = require("express");
const crypto = require("crypto");
const User = require("../models/userModel");
const genPassword = require("../lib/password").genPassword;
const nodemailer = require("nodemailer");

require("dotenv").config();

const router = express.Router();

router.patch("/updatePasswordViaEmail", async (req, res) => {
    //console.log("jestem w updatePasswordViaEmail");
    const isExist = User.findOne({
            resetPasswordToken: req.query.resetPasswordToken,
            resetPasswordExpires: {
                $gt: Date.now(),
            },
        },
        async function (err, user) {
            console.log(user);
            //console.log("jestem w updatePasswordViaEmail");
            if (err) return res.status(404).json(err);
            if (user == null)
                return res
                    .status(403)
                    .json("password reset link is invalid or has expired");
            else if (user != null) {
                try {
                    const saltHash = await genPassword(req.body.password);
                    const salt = saltHash.salt;
                    const hash = saltHash.hash;
                    console.log(saltHash);

                    await user.update({
                        $set: {
                            hash: hash,
                            salt: salt,
                            resetPasswordToken: null,
                            resetPasswordExpires: null,
                        },
                    });
                    user.save();
                    res.status(200).json(user);
                } catch (err) {
                    res.status(404).json(err);
                }
            } else {
                console.error("no user exists in db to update");
                res.status(401).json("no user exists in db to update");
            }
        }
    );
});

module.exports = router;