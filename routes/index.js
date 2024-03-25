const express = require('express');
const usersRouter = require('./users.router');
const customersRouter = require('./customers.router');
const authRouter = require('./auth.router');
const companiesRouter = require('./companies.router');
const formTemplatesRouter = require('./formTemplates.router');
const formRouter = require('./form.router');


function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/users', usersRouter);
  router.use('/customers', customersRouter);
  router.use('/auth', authRouter);
  router.use('/companies', companiesRouter);
  router.use('/form-templates', formTemplatesRouter);
  router.use('/forms', formRouter);

}

module.exports = routerApi;
