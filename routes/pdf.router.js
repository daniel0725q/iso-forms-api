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

      const setOptions = (options, myUser) => {
        return {
        format: 'A4', // Set page size as A4
    }
    };
      const { html, options } = req.body;
      const newhtml = '<html>' +
        '<head>' +
          '<style>' +
            '* {font-size: 11px;font-family: "Arial", Arial, sans-serif;}' + 
            'table {width: 100%;border-collapse: collapse;}' +
            'td {border: 1px solid black;text-align: center}' +
            'body {margin: 5%;}' +
          '</style>' +
        '</head>' +
        '<body>' + html + '</body>' + 
      '</html>';

        pdf.create(newhtml, setOptions(options, user)).toBuffer((err, buffer) => {
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
