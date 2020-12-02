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
module.exports.courtsGet = async function (req, res) {
  try {
    const tariff = await courtsTariff.find();
    let tariffFixed = JSON.parse(
      JSON.stringify(tariff).split('"_id":').join('"id":'),
    );
    res.status(200).json(tariffFixed);
  } catch (err) {
    res.status(404).json(err);
  }
};
