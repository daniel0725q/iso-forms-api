const express = require('express');
const CompaniesService = require('../services/companies.service');
const validationHandler = require('../middlewares/validator.handler');
const password = require('passport');
const { checkRoles } = require('./../middlewares/auth.handler');


const {
  createCompanySchema,
  getCompanySchema,
  updateCompanySchema,
} = require('../schemas/company.schema');

const router = express.Router();
const service = new CompaniesService();

router.get('/',password.authenticate('jwt', {session: false}),
  checkRoles(1),
  async (req, res, next) => {
    try {
      res.json(await service.find());
    } catch (error) {
      next(error);
    }
});

/*
router.post('/',
password.authenticate('jwt', {session: false}),
checkRoles('admin'),
  validationHandler(createCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      res.status(201).json(await service.create(body));
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
  validationHandler(getCustomerSchema, 'params'),
  validationHandler(updateCustomerSchema, 'body'),
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
  validationHandler(getCustomerSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      res.status(200).json(await service.delete(id));
    } catch (error) {
      next(error);
    }
  }
);
*/

module.exports = router;
