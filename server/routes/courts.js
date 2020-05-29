const express = require("express");
const router = express.Router();
const courtController = require("./../controllers/courtController");
router.get("/api/court", function (req, res) {
  res.send("respond with a resource");
});

router.get("/api/courts", courtController.courtsGet);

router.post("/api/court/create", courtController.courtsCreate);

router.delete("/api/court/delete/:courtId", courtController.courtsDelete);

router.patch("/api/court/update/:courtId", courtController.courtsUpdate);

router.get("/api/court/:courtId", courtController.getCourt);

module.exports = router;
