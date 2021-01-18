const courtModel = require('../models/courtModel');

module.exports.courtsGetFront = async function (req, res) {
  try {
    const courts = await courtModel.find();
    res.status(200).json(courts);
  } catch (err) {
    res.status(404).json(err);
  }
};
