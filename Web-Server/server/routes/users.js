var express = require("express");
const userModel = require("../models/userModel");
const genPassword = require("../lib/password").genPassword;
var router = express.Router();

router.get("/user", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/users", async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(404).json(err);
  }
});

router.post("/user/create", async (req, res) => {
  const saltHash = genPassword(req.body.password);

  const salt = saltHash.salt;
  const hash = saltHash.hash;

  const user = new userModel({
    login: {
      email: req.body.email,
      hash: hash,
      salt: salt,
    },
    name: req.body.name,
    surname: req.body.surname,
  });
  try {
    const savedUser = await user.save();
    res.status(201).json(savedUser);
    res.redirect("/");
  } catch (err) {
    res.status(400).json(err);
  }
});

router.patch("/user/delete/:userId", async (req, res) => {
  try {
    const deletedUser = await userModel.updateOne(
      {
        _id: req.params.userId,
      },
      {
        $set: {
          isActive: false,
        },
      }
    );
    res.status(200).json(deletedUser);
  } catch (err) {
    res.status(404).json(err);
  }
});

router.patch("/user/update/:userId", async (req, res) => {
  try {
    const updatedUser = await userModel.updateOne(
      {
        _id: req.params.userId,
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
            postalCode: req.body.postalCode,
          },
          vat: {
            nip: req.body.nip,
            regon: req.body.regon,
          },
        },
      }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(404).json(err);
  }
});

router.get("/user/:userId", async (req, res) => {
  try {
    const getUser = await userModel.findById(req.params.userId);
    res.status(200).json(getUser);
  } catch (err) {
    res.status(404).json(err);
  }
});

module.exports = router;
