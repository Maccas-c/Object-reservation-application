const express = require("express");
const userModel = require("../models/userModel");
const genPassword = require("../lib/password").genPassword;
const {
  check,
  validationResult
} = require("express-validator");
const router = express.Router();


router.get("/api/users", async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(404).json(err);
  }
});

router.post("/api/user/create",
  [check("email").
    isEmail().
    notEmpty(),

    check('password')
    .isLength(5)
    .notEmpty()
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/)
    .withMessage('Password should be combination of one uppercase , one lower case, one digit and min 6 , max 20 char long'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array()
      });
    }
    const isExist = userModel.findOne({
        "login.email": req.body.email,
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
              salt: salt,
            },
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
  });

router.patch("/api/user/delete/:userId", async (req, res) => {
  try {
    const deletedUser = await userModel.updateOne({
      _id: req.params.userId,
    }, {
      $set: {
        isActive: false,
      },
    });
    res.status(200).json(deletedUser);
  } catch (err) {
    res.status(404).json(err);
  }
});

router.patch("/api/user/update/:userId", async (req, res) => {
  try {
    const updatedUser = await userModel.updateOne({
      _id: req.params.userId,
    }, {
      $set: {
        name: req.body.name,
        surname: req.body.surname,
        age: req.body.age,
        phone_number: req.body.phone_number,
        address: {
          street: req.body.street,
          city: req.body.city,
          postalCode: req.body.postalCode,
        },
        vat: {
          nip: req.body.nip,
          regon: req.body.regon,
        },
      },
    });
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(404).json(err);
  }
});

router.get("/api/user/:userId", async (req, res) => {
  try {
    const getUser = await userModel.findById(req.params.userId);
    res.status(200).json(getUser);
  } catch (err) {
    res.status(404).json(err);
  }
});

module.exports = router;