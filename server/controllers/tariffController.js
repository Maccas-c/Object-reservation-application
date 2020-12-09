const tariffModel = require('../models/tariffModel');
const courtsTariff = require('../models/tariffModel');

module.exports.tariffCreate = async function (req, res) {
  const courts = new courtsTariff({
    ids: req.body.ids,
    name: req.body.name,
    classes_and_sports_training: req.body.classes_and_sports_training,
    tournament_matches: req.body.tournament_matches,
    university_club: req.body.university_club,
  });
  try {
    const savedCourt = await courts.save();
    res.status(201).json(savedCourt);
  } catch (err) {
    res.status(400).json(err);
  }
};
module.exports.tariffsGet = async function (req, res) {
  try {
    const tariff = await courtsTariff.find();
    const tariffFixed = JSON.parse(
      JSON.stringify(tariff).split('"_id":').join('"id":'),
    );
    res.status(200).json(tariffFixed);
  } catch (err) {
    res.status(404).json(err);
  }
};
module.exports.tariffGet = async function (req, res) {
  try {
    const tariff = await courtsTariff.findById(req.params.id);
    const tariffFixed = JSON.parse(
      JSON.stringify(tariff).split('"_id":').join('"id":'),
    );
    res.status(200).json(tariffFixed);
  } catch (err) {
    res.status(404).json(err);
  }
};

module.exports.tariffUpdate = async function (req, res) {
  try {
    const resposneData = req.body;
    const tariffUpdate = await tariffModel.updateOne(
      {
        _id: req.params.id,
      },
      {
        $set: {
          ids: req.body.ids,
          name: req.body.name,
          classes_and_sports_training: req.body.classes_and_sports_training,
          tournament_matches: req.body.tournament_matches,
          university_club: req.body.university_club,
        },
      },
    );
    res.status(200).send(resposneData);
  } catch (err) {
    res.status(404).json(err);
  }
};
