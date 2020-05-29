const { ObjectId } = require("mongodb");
const userModel = require("./../models/userModel");
const genPassword = require("./../lib/password").genPassword;
const { validationResult } = require("express-validator");

module.exports.userCreate = async function (req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array(),
    });
  }
  const isExist = userModel.findOne(
    {
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
          name: req.body.name,
          surname: req.body.surname,
          sex: req.body.sex,
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
};

module.exports.userDelete = async function (req, res) {
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
};

module.exports.userUpdate = async function (req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array(),
    });
  }
  try {
    const updatedUser = await userModel.updateOne(
      {
        _id: ObjectId(req.body.id),
      },
      req.body
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(404).json(err);
  }
};

module.exports.userGet = async function (req, res) {
  try {
    const getUser = await userModel.findById(req.params.userId);
    const json = JSON.parse(
      JSON.stringify(getUser).split('"login":').join('"longing2":')
    );
    json.email = json.longing2.email;
    if (json) {
      console.log(json.sex);
      if (json.sex.toLowerCase().startsWith("m")) {
        json.sex = "male";
      } else {
        json.sex = "female";
      }
    }
    res.status(200).json(json);
  } catch (err) {
    res.status(404).json(err);
  }
};
