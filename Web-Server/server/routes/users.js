var express = require('express');
const ExampleSchema = require('../models/Example')
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/', (req, res) => {
  const example = new ExampleSchema({
    title: req.body.title,
    nextvalue: req.body.nextvalue
  });

  example.save()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json({
        message: err
      });
    })

});

module.exports = router;