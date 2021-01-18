const tariffModel = require('../models/tariffModel');
const courtsTariff = require('../models/tariffModel');

module.exports.tariffsGet = async function (req, res) {
  try {
    const tariff = await courtsTariff.find();
    const tariffFixed = JSON.parse(
      JSON.stringify(tariff).split('"_id":').join('"id":')
    );
    res.status(200).json(tariffFixed);
  } catch (err) {
    res.status(404).json(err);
  }
};

// front
module.exports.tariffsGetFront = async function (req, res) {
  try {
    const tariff = await courtsTariff.find();
    res.status(200).json(tariff);
  } catch (err) {
    res.status(404).json(err);
  }
};
