var express = require('express');
const userModel = require('../models/userModel');
const genPassword = require('../lib/password').genPassword;
var router = express.Router();

/* GET users listing. */
router.get('/user', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/users', async (req, res) => {
  try {
    const users = await userModel.find();
    res.json(users);
  } catch (err) {
    res.json(err);
  }
});

router.post('/user/create', async (req, res) => {
  const saltHash = genPassword(req.body.password);

  const salt = saltHash.salt;
  const hash = saltHash.hash;

  const user = new userModel({
    login: {
      name: req.body.name,
      surname: req.body.surname,
      email: req.body.email,
      hash: hash,
      salt: salt,
      age: req.body.age,
      phone_number: req.body.phone_number,
      isStudent: req.body.isStudent
    }
  });
  try {
    const savedUser = await user.save();
    res.json(savedUser);
    res.redirect('/');
  } catch (err) {
    res.json(err);
  }
});

router.patch('/user/delete/:userId', async (req, res) => {
  try {
    const deleteUser = await userModel.updateOne({
      _id: req.params.userId
    }, {
      $set: {
        isActive: false
      }
    });
    res.json(updateUser);
  } catch (err) {
    res.json(err);
  }
});

router.patch('/user/update/:userId', async (req, res) => {
  try {
    const updateUser = await userModel.updateOne({
      _id: req.params.userId
    }, {
      $set: {
        name: req.body.name,
        surname: req.body.surname,
        age: req.body.age,
        phone_number: req.body.phone_number
      }
    });
    res.json(updateUser);
  } catch (err) {
    res.json(err);
  }
});

router.get('/user/:userId', async (req, res) => {
  try {
    const getUser = await userModel.findById(req.params.userId);
    res.json(getUser);
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;