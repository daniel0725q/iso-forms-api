const express = require('express');
const jwt = require('jsonwebtoken');

const AuthService = require('./../services/auth.service');
const UserService = require('./../services/user.service');
const validatorHandler = require('../middlewares/validator.handler'),{
    loginAuthSchema,
    recoveryAuthSchema,
    changePasswordAuthSchema,
    recoverPasswordAuthSchema,
    isAdminAuthSchema
  } = require('../schemas/auth.schema');
const router = express.Router();
const service = new AuthService();
const userService = new UserService();
const pdf = require('html-pdf');

router.post('/logo',
async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    const token = authorization.substring(7);
    const userId = await jwt.decode(token).uid;

    const user = await userService.findOne(userId);
    res.json({logo: user.company.logo});
  } catch (error) {
    next(err);
  }
  }
);

router.post('/generate',
  async (req, res, next) => {
    try {
      const authorization = req.headers.authorization;
      const token = authorization.substring(7);
      const userId = await jwt.decode(token).uid;

      const user = await userService.findOne(userId);
      console.log(user.company.logo)

      const setOptions = (options, myUser) => {
        return {
        format: 'A4', // Set page size as A4
        header: {
          height: '100px',
        }
    }
    };
        const { html, options } = req.body;
        pdf.create(html, setOptions(options, user)).toBuffer((err, buffer) => {
        if (err) {
            return res.status(500).send('Error generating PDF');
        }

        // Send PDF as response
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=example.pdf');
        res.send(buffer);
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
