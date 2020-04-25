var express = require('express');
const ExampleSchema = require('../models/Example')
var router = express.Router();

/* GET users listing. */
router.get('/users', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/users/create', async (req,res) =>{
  console.log(req.body);
  const user = new ExampleSchema({
    title: req.body.title,
    nextvalue: req.body.nextvalue
  });
  try{
    const savedUser = await user.save();
    res.json(savedUser);
  } catch(err){
    res.json(err);
  }
});

module.exports = router;