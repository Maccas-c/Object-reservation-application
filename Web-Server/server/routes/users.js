var express = require('express');
const userModel = require('../models/userModel')
var router = express.Router();

/* GET users listing. */
router.get('/user', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/users', async(req, res) => {
  try{
    const users = await userModel.find();
    res.json(users);
  }
  catch(err){
    res.json(err);
  }
});

router.post('/user/create', async (req,res) =>{
  console.log(req.body);
  const user = new userModel({
  name: req.body.name,
	surname: req.body.surname,
	email: req.body.email,
  password: req.body.password,
  salt: req.body.salt,
  age: req.body.age,
	phone_number: req.body.phone_number,
  isStudent: req.body.isStudent
  });
  try{
    const savedUser = await user.save();
    res.json(savedUser);
  } catch(err){
    res.json(err);
  }
});

router.patch('/user/delete/:userId', async (req,res) =>{
  try{
    const deleteUser = await userModel.updateOne(
      {_id: req.params.userId},
      { $set: {
        isActive: false,
      }});
    res.json(updateUser);
  }
  catch(err){
    res.json(err);
  }
});



router.patch('/user/update/:userId', async (req, res) =>{
  try{
    const updateUser = await userModel.updateOne(
      {_id: req.params.userId},
      { $set: {
        name: req.body.name,
	      surname: req.body.surname,
        age: req.body.age,
	      phone_number: req.body.phone_number,
      }});
    res.json(updateUser);
  }
  catch( err){
    res.json(err);
  }
});

router.get('/user/:userId', async (req, res) =>{
  try{
    const getUser = await userModel.findById(req.params.userId);
    res.json(getUser);
  }
  catch( err){
    res.json(err);
  }
});

module.exports = router;