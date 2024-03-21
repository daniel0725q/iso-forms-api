const express = require('express');
const CompaniesService = require('../services/companies.service');
const validationHandler = require('../middlewares/validator.handler');
const password = require('passport');
const { checkRoles } = require('./../middlewares/auth.handler');


const {
  createCompanySchema,
  getCompanySchema,
  updateCompanySchema,
  companyHasLogo,
} = require('../schemas/company.schema');

const router = express.Router();
const service = new CompaniesService();

router.get('/',password.authenticate('jwt', {session: false}),
  checkRoles(1),
  validationHandler(companyHasLogo, 'query'),
  async (req, res, next) => {
    try {
      const { hasLogo } = req.query;
      if (hasLogo == 'true') {
        res.json(await service.find());
      } else {
        res.json(await service.findNoLogo());
      }
    } catch (error) {
      next(error);
    }
});

router.get('/:id',password.authenticate('jwt', {session: false}),
  checkRoles(1),
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
  validationHandler(createCompanySchema, 'body'),
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
  validationHandler(getCompanySchema, 'params'),
  validationHandler(updateCompanySchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      console.log(body);
      res.status(201).json(await service.update(id, body));
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id',
  validationHandler(getCompanySchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      if (id == 1) {
        throw Error("Can't delete main company");
      }
      res.status(200).json(await service.delete(id));
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
