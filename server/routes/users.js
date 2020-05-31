const express = require("express");
const { isAuth, checkUser, checkEmail } = require("./authMiddleware");
const { check } = require("express-validator");
const router = express.Router();
const userController = require("./../controllers/usersController");

router.get("/api/checkAuthUser", isAuth, (req, res) => {
  res.status(200).json("authorized");
});

router.post(
  "/api/user/create",
  [
    check("email").isEmail().notEmpty(),
    check("password")
      .isLength(5)
      .notEmpty()
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/)
      .withMessage(
        "Password should be combination of one uppercase , one lower case, one digit and min 6 , max 20 char long"
      ),
  ],
  userController.userCreate
);

router.patch("/api/user/delete/:userId", userController.userDelete);
router.patch(
  "/api/user/update",
  [
    check("name").notEmpty().optional(),
    check("surname").notEmpty().optional(),
    check("age")
      .isNumeric()
      .optional()
      .matches(/^([1-9][0-9]?){0,1}$/),
    check("adress_postalCode")
      .matches(/^\d{2}[- ]{0,1}\d{3}$/)
      .optional(),
    check("phone_number")
      .matches(
        /(?:(?:(?:\+|00)?48)|(?:\(\+?48\)))?(?:1[2-8]|2[2-69]|3[2-49]|4[1-68]|5[0-9]|6[0-35-9]|[7-8][1-9]|9[145])\d{7}/
      )
      .optional(),
    check("nip")
      .matches(
        /^((\d{3}[-]\d{3}[-]\d{2}[-]\d{2})|(\d{3}[-]\d{2}[-]\d{2}[-]\d{3}))$/
      )
      .optional(),
  ],
  isAuth,
  checkUser,
  checkEmail,
  userController.userUpdate
);

router.get("/api/user/:userId", userController.userGet);

module.exports = router;
