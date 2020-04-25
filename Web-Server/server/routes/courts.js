var express = require('express');
const courtModel = require('../models/courtModel')
var router = express.Router();


router.get('/court', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/courts', async(req, res) => {
  try{
    const courts = await courtModel.find();
    res.json(courts);
  }
  catch(err){
    res.json(err);
  }
});

router.post('/court/create', async (req,res) =>{
  console.log(req.body);
  const court = new courtModel({
    id: req.body.id,
    name: req.body.name,
    description: req.body.description
  });
  try{
    const savedCourt = await court.save();
    res.json(savedCourt);
  } catch(err){
    res.json(err);
  }
});

router.delete('/court/delete/:courtId', async (req,res) =>{
  try{
    const deleteCourt = await courtModel.remove({_id: req.params.courtId})
    res.json(deleteCourt);
  }
  catch(err){
    res.json(err);
  }
});



router.patch('/court/update/:courtId', async (req, res) =>{
  try{
    const updateCourt = await courtModel.updateOne(
      {_id: req.params.courtId},
      { $set: {
        id: req.body.id,
        name: req.body.name,
        description: req.body.description
      }});
    res.json(updateCourt);
  }
  catch( err){
    res.json(err);
  }
});

router.get('/court/:courtId', async (req, res) =>{
  try{
    const getCourt = await courtModel.findById(req.params.courtId);
    res.json(getCourt);
  }
  catch( err){
    res.json(err);
  }
});

module.exports = router;