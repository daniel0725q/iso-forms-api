const express = require('express');
const jwt = require('jsonwebtoken');
const FormTemplateService = require('../services/formTemplates.service');
const validationHandler = require('../middlewares/validator.handler');
const password = require('passport');
const { checkRoles } = require('./../middlewares/auth.handler');
const { createFormTemplateSchema, getFormTemplateSchema, updateFormTemplateSchema, copyFormTemplateSchema } = require('../schemas/formTemplate.schema');

const router = express.Router();
const service = new FormTemplateService();

router.get('/',password.authenticate('jwt', {session: false}),
  async (req, res, next) => {
    try {
      const authorization = req.headers.authorization;
      const token = authorization.substring(7);
      const company = jwt.decode(token).company;
      res.json(await service.find(company));
    } catch (error) {
      next(error);
    }
});

router.get('/:id',password.authenticate('jwt', {session: false}),
  validationHandler(getFormTemplateSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      res.json(await service.findOne(id));
    } catch (error) {
      next(error);
    }
});

router.post('/',
password.authenticate('jwt', {session: false}),
checkRoles(1),
  validationHandler(createFormTemplateSchema, 'body'),
  async (req, res, next) => {
    try {
      const authorization = req.headers.authorization;
      const token = authorization.substring(7);
      const company = jwt.decode(token).company;
      const body = {...req.body, companyId: company};
      res.status(201).json(await service.create(body));
    } catch (error) {
      next(error);
    }
  }
);

router.post('/:id/copy',
password.authenticate('jwt', {session: false}),
checkRoles(1),
  validationHandler(getFormTemplateSchema, 'params'),
  validationHandler(copyFormTemplateSchema, 'body'),
  async (req, res, next) => {
    try {
      const authorization = req.headers.authorization;
      const token = authorization.substring(7);
      const company = jwt.decode(token).company;
      const body = {...req.body, companyId: company};
      delete  body.id;
      res.status(201).json(await service.create(body));
    } catch (error) {
      next(error);
    }
  }
);


router.patch('/:id',
  validationHandler(getFormTemplateSchema, 'params'),
  validationHandler(updateFormTemplateSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      res.status(201).json(await service.update(id, body));
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id',
  validationHandler(getFormTemplateSchema, 'params'),
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
