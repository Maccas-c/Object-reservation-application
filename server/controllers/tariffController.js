const courtsTariff = require('../models/tariffModel');

module.exports.tariffCreate = async function (req, res) {
  const courts = new courtsTariff({
    id: req.body.id,
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
