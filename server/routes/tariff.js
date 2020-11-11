const express = require("express");
const router = express.Router();
const tariffController = require("../controllers/tariffController");

router.get("/api/tariff", tariffController.tariff);

module.exports = router;



