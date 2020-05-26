const express = require('express');
const router = express.Router();

const { ObjectId } = require('mongodb');
const isAuth = require('./authMiddleware').isAuth;
const authRole = require('./authMiddleware').authRole;
const userModel = require('../models/userModel');
const { check, validationResult } = require('express-validator');

router.get(
  '/api/admin',
  isAuth,
  authRole(process.env.ROLE_ADMIN),
  (req, res) => {
    res.send('admin');
  }
);

router.get(
  '/api/admin/users',
  // isAuth,
  // authRole(process.env.ROLE_ADMIN),
  async (req, res) => {
    try {
      const users = await userModel.find();
      res.status(200).json(users);
    } catch (err) {
      res.status(404).json(err);
    }
  }
);

router.patch(
  '/api/admin/delete/:userId',
  isAuth,
  authRole(process.env.ROLE_ADMIN),
  async function (req, res) {
    try {
      const updatedUser = await userModel.updateOne(
        {
          _id: req.params.userId
        },
        {
          $set: {
            isStudent: req.body.isStudent
          }
        }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(404).json(err);
    }
  }
);

router.patch(
  '/api/admin/update',
  // isAuth,
  //   authRole(process.env.ROLE_ADMIN),
  [
    check('name').optional(),
    check('surname').optional(),
    check('age').isNumeric().optional(),
    check('postalCode')
      .matches(/^\d{2}[- ]{0,1}\d{3}$/)
      .optional(),
    check('phone_number')
      .matches(
        /(?:(?:(?:\+|00)?48)|(?:\(\+?48\)))?(?:1[2-8]|2[2-69]|3[2-49]|4[1-68]|5[0-9]|6[0-35-9]|[7-8][1-9]|9[145])\d{7}/
      )
      .optional(),
    check('nip')
      .matches(
        /^((\d{3}[- ]\d{3}[- ]\d{2}[- ]\d{2})|(\d{3}[- ]\d{2}[- ]\d{2}[- ]\d{3}))$/
      )
      .optional()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array()
      });
    }
    try {
      const updatedUser = await userModel.updateOne(
        {
          _id: ObjectId(req.body._id)
        },

        req.body
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(404).json(err);
    }
  }
);
module.exports = router;
