const readJson = require('../objects/readJson');

module.exports.tariff = async function (req, res) {
    try {
        const result = readJson.readFile();
        res.status(200).json(result);
    } catch (err) {
        res.status(404).json(err);
    }
}