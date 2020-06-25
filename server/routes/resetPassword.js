const express = require("express");
const crypto = require('crypto');
const User = require('../models/userModel');
const nodemailer = require('nodemailer');
require('dotenv').config();

const resetPassword = require("../controllers/resetPasswordController");


const router = express.Router();

router.get('/api/reset', resetPassword.resetPassword);

module.exports = router;