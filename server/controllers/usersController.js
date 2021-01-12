const { ObjectId } = require('mongodb');
const userModel = require('./../models/userModel');
const genPassword = require('./../lib/password').genPassword;
const { validationResult } = require('express-validator');
const nodemailer = require('nodemailer');

module.exports.userCreate = async function (req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array(),
    });
  }
  const isExist = userModel.findOne(
    {
      email: req.body.email,
    },
    async function (err, user) {
      if (err) return res.status(404).json(err);
      if (user) {
        if (user.isActive == true) {
          return res.status(422).json('E-mail istnieje');
        } else {
          try {
            const saltHash = await genPassword(req.body.password);
            const salt = saltHash.salt;
            const hash = saltHash.hash;

            await user.update({
              $set: {
                email: req.body.email,
                hash: hash,
                salt: salt,
                name: req.body.name,
                surname: req.body.surname,
                sex: req.body.sex,
                isActive: true,
                createDate: Date.now(),
              },
            });
            user.save();
            return res.status(200).json(user);
          } catch (err) {
            return res.status(404).json(err);
          }
        }
      } else {
        const saltHash = await genPassword(req.body.password);
        const salt = saltHash.salt;
        const hash = saltHash.hash;

        const user = new userModel({
          email: req.body.email,
          hash: hash,
          salt: salt,
          name: req.body.name,
          surname: req.body.surname,
          sex: req.body.sex,
          createDate: Date.now(),
        });
        let transporter = nodeMailer.createTransport({
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
          auth: {
            user: `${process.env.EMAIL_ADDRESS}`,
            pass: `${process.env.EMAIL_PASSWORD}`,
          },
        });

        const mailOptions = {
          from: `${process.env.EMAIL_ADDRESS}`,
          to: `${user.email}`,
          subject: 'Create account',
          text:
            'Dziękujemy za rejestrację w naszym  systemie, życzymy miłego i sprawnego korzystania.',
        };

        transporter.sendMail(mailOptions);
        try {
          const savedUser = await user.save();
          return res.status(201).json(savedUser);
        } catch (err) {
          return res.status(400).res.json(err);
        }
      }
    },
  );
};

module.exports.userDelete = async function (req, res) {
  try {
    const deletedUser = await userModel.updateOne(
      {
        _id: req.params.userId,
      },
      {
        $set: {
          isActive: false,
        },
      },
    );
    return res.status(200).json(deletedUser);
  } catch (err) {
    return res.status(404).json(err);
  }
};

module.exports.userUpdate = async function (req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array(),
    });
  }
  try {
    const updatedUser = await userModel.findOneAndUpdate(
      {
        _id: ObjectId(req.body.id),
      },
      {
        $set: req.body,
      },
      {
        useFindAndModify: false,
        new: true,
      },
    );
    return res.status(200).json(updatedUser);
  } catch (err) {
    return res.status(404).json(err);
  }
};

module.exports.userGet = async function (req, res) {
  try {
    const getUser = await userModel.findById(req.params.userId);

    return res.status(200).json(getUser);
  } catch (err) {
    return res.status(404).json(err);
  }
};
