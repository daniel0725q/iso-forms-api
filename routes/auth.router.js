const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');

const AuthService = require('./../services/auth.service');
const validatorHandler = require('../middlewares/validator.handler'),{
    loginAuthSchema,
    recoveryAuthSchema,
    changePasswordAuthSchema,
    recoverPasswordAuthSchema,
    isAdminAuthSchema
  } = require('../schemas/auth.schema');
const router = express.Router();
const service = new AuthService();

router.post('/login',
validatorHandler(loginAuthSchema, 'body'),
  passport.authenticate('local', {session: false}),
  async (req, res, next) => {
    try {
      const id = req.user.id;
      const token = await service.signToken(id);
      res.json(token);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/recovery',
validatorHandler(recoveryAuthSchema, 'body'),
  async (req, res, next) => {
    try {
      const { email } = req.body;
      const rta = await service.sendRecovery(email);
      res.json(rta);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/recover-password',
validatorHandler(recoverPasswordAuthSchema, 'body'),
  async (req, res, next) => {
    try {
      const { token, password } = req.body;
      const rta = await service.recoverPassword(token, password);
      res.json(rta);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/change-password',
validatorHandler(changePasswordAuthSchema, 'body'),
  async (req, res, next) => {
    try {
      var token = req.headers.authorization;
      token = token.substring(7);
      const { password, newPassword } = req.body;
      const rta = await service.changePassword(token, password, newPassword);
      res.json(rta);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/is-admin',
validatorHandler(isAdminAuthSchema, 'body'),
  async (req, res, next) => {
    try {
      const { token } = req.body;
      const rta = await service.isAdmin(token);
      res.json(rta);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
