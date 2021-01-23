const express = require('express');
const {
  isAuth,
  checkEmail,
  checkUser,
} = require('./../controllers/middleware');
const { check } = require('express-validator');
const router = express.Router();
const userController = require('./../controllers/usersController');

router.get('/api/checkAuthUser', isAuth, (req, res) => {
  res.status(200).json('authorized');
});

router.post(
  '/api/user/create',
  [
    check('email').isEmail().notEmpty(),
    check('password')
      .isLength(5)
      .notEmpty()
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/)
      .withMessage(
        'Password should be combination of one uppercase , one lower case, one digit and min 6 , max 20 char long',
      ),
  ],
  userController.userCreate,
);

// router.patch(
//   '/api/user/delete/:userId',
//   isAuth,
//   checkUser,
//   userController.userDelete
// );
router.patch(
  '/api/user/update',
  [
    check('name').notEmpty().optional(),
    check('surname').notEmpty().optional(),
    check('age'),
  ],
  isAuth,
  checkUser,
  checkEmail,
  userController.userUpdate,
);

router.get('/api/getUser/:userId', userController.userGet);

module.exports = router;
