const express = require('express');
const crypto = require('crypto');
const User = require('../models/userModel');
const genPassword = require('../lib/password').genPassword;
const nodemailer = require('nodemailer');
const updatePasswordViaEmail = require("./../controllers/updatePasswordViaEmailController");
require('dotenv').config();

const router = express.Router();

router.patch(
  "/api/updatePasswordViaEmail",
  updatePasswordViaEmail.updatePasswordViaEmail_Patch
);

module.exports = router;