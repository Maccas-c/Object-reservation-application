const express = require('express');
const crypto = require('crypto');
const User = require('../models/userModel');
const nodemailer = require('nodemailer');
const forgotPassword = require("../controllers/forgotPasswordController");

require('dotenv').config();

const router = express.Router();


router.post('/api/forgotPassword', forgotPassword.forgotPassword);

module.exports = router;