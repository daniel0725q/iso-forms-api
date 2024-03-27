const express = require('express');
const validationHandler = require('../middlewares/validator.handler');
const password = require('passport');
const { checkRoles } = require('./../middlewares/auth.handler');
const { createFormSchema, getFormSchema, updateFormSchema } = require('../schemas/form.schema');
const FormService = require('../services/form.service');
const jwt = require('jsonwebtoken');
const UserService = require('../services/user.service');

const router = express.Router();
const service = new FormService();
const userService = new UserService();

router.get('/',password.authenticate('jwt', {session: false}),
  async (req, res, next) => {
    try {
      res.json(await service.find());
    } catch (error) {
      next(error);
    }
});

router.get('/:id',password.authenticate('jwt', {session: false}),
  validationHandler(getFormSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      res.json(await service.findOne(id));
    } catch (error) {
      next(error);
    }
});

router.get('/mine/:id',password.authenticate('jwt', {session: false}),
  async (req, res, next) => {
    try {
      const authorization = req.headers.authorization;
      const token = authorization.substring(7);
      const userId = jwt.decode(token).uid;
      res.json(await service.findByUser(userId));
    } catch (error) {
      next(error);
    }
});

router.get('/company/all',password.authenticate('jwt', {session: false}),
  async (req, res, next) => {
    try {
      const authorization = req.headers.authorization;
      const token = authorization.substring(7);
      const userId = jwt.decode(token).uid;
      console.log(userId);
      const company = await userService.findOne(userId);
      const companyId = company.companyId;
      console.log(companyId);
      res.json(await service.findByCompany(companyId));
    } catch (error) {
      next(error);
    }
});

router.post('/',
password.authenticate('jwt', {session: false}),
  validationHandler(createFormSchema, 'body'),
  async (req, res, next) => {
    try {
      const authorization = req.headers.authorization;
      const token = authorization.substring(7);
      const userId = jwt.decode(token).uid;
      const body = req.body;
      delete body.id;
      body.userId = userId;
      res.status(201).json(await service.create(body));
    } catch (error) {
      next(error);
    }
  }
);


router.patch('/:id',
  validationHandler(getFormSchema, 'params'),
  validationHandler(updateFormSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = {};
      body.data = req.body.data;
      res.status(201).json(await service.update(id, body));
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id',
  validationHandler(getFormSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      res.status(200).json(await service.delete(id));
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
