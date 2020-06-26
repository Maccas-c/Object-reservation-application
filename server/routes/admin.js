const express = require('express');
const router = express.Router();
const { isAuth, authRole } = require('./authMiddleware');
const { check } = require('express-validator');
const adminController = require('./../controllers/adminController');
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
  //isAuth,
  //authRole(process.env.ROLE_ADMIN),
  adminController.usersGet
);

router.patch(
  '/api/admin/delete/:userId',
  // isAuth,
  // authRole(process.env.ROLE_ADMIN),
  adminController.userDelete
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
      .matches(/^\+(?:[0-9] ?){6,14}[0-9]$/)
      .optional(),
    check('nip')
      .matches(
        /^((\d{3}[- ]\d{3}[- ]\d{2}[- ]\d{2})|(\d{3}[- ]\d{2}[- ]\d{2}[- ]\d{3}))$/
      )
      .optional(),
  ],
  adminController.userUpdate
);
module.exports = router;
