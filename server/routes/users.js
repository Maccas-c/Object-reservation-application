const express = require("express");
const userModel = require("../models/userModel");
const genPassword = require("../lib/password").genPassword;
const isAuth = require("./authMiddleware").isAuth;
const { check, validationResult } = require("express-validator");
const router = express.Router();

router.post(
  "/api/user/create",
  [
    check("email").isEmail().notEmpty(),

    check("password")
      .isLength(5)
      .notEmpty()
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/)
      .withMessage(
        "Password should be combination of one uppercase , one lower case, one digit and min 6 , max 20 char long"
      )
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array()
      });
    }
    const isExist = userModel.findOne(
      {
        "login.email": req.body.email
      },
      async function (err, user) {
        if (err) return res.status(404).json(err);
        if (user) return res.status(422).json("The email exist");
        else {
          const saltHash = await genPassword(req.body.password);
          const salt = saltHash.salt;
          const hash = saltHash.hash;

          const user = new userModel({
            login: {
              email: req.body.email,
              hash: hash,
              salt: salt
            }
            // name: req.body.name,
            // surname: req.body.surname,
          });
          try {
            const savedUser = await user.save();
            res.status(201).json(savedUser);
          } catch (err) {
            res.status(400).res.json(err);
          }
        }
      }
    );
  }
);

router.patch("/api/user/delete/:userId", isAuth, async (req, res) => {
  try {
    const deletedUser = await userModel.updateOne(
      {
        _id: req.params.userId
      },
      {
        $set: {
          isActive: false
        }
      }
    );
    res.status(200).json(deletedUser);
  } catch (err) {
    res.status(404).json(err);
  }
});

router.patch(
  "/api/user/update/:userId",
  [
    check("name").notEmpty(),
    check("surname").notEmpty(),
    check("age").isNumeric(),
    check("postalCode").matches(/^\d{2}[-]{0,1}\d{3}$/),
    check("phone_number").matches(
      /(?:(?:(?:\+|00)?48)|(?:\(\+?48\)))?(?:1[2-8]|2[2-69]|3[2-49]|4[1-68]|5[0-9]|6[0-35-9]|[7-8][1-9]|9[145])\d{7}/
    ),
    check("nip").matches(
      /^((\d{3}[-]\d{3}[-]\d{2}[-]\d{2})|(\d{3}[-]\d{2}[-]\d{2}[-]\d{3}))$/
    )
  ],
  isAuth,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array()
      });
    }
    try {
      const updatedUser = await userModel.updateOne(
        {
          _id: req.params.userId
        },
        {
          $set: {
            name: req.body.name,
            surname: req.body.surname,
            age: req.body.age,
            phone_number: req.body.phone_number,
            address: {
              street: req.body.street,
              city: req.body.city,
              postalCode: req.body.postalCode
            },
            vat: {
              nip: req.body.nip
            }
          }
        }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(404).json(err);
    }
  }
);

router.get("/api/user/:userId", isAuth, async (req, res) => {
  try {
    const getUser = await userModel.findById(req.params.userId);
    res.status(200).json(getUser);
  } catch (err) {
    res.status(404).json(err);
  }
});

module.exports = router;
