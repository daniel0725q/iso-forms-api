const express = require('express');
const usersRouter = require('./users.router');
const customersRouter = require('./customers.router');
const authRouter = require('./auth.router');
const companiesRouter = require('./companies.router');
const formTemplatesRouter = require('./formTemplates.router');
const formRouter = require('./form.router');
const pdfRouter = require('./pdf.router');
const diagramRouter = require('./diagram.router');
const paymentRouter = require('./payment.router');


function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/users', usersRouter);
  router.use('/customers', customersRouter);
  router.use('/auth', authRouter);
  router.use('/companies', companiesRouter);
  router.use('/form-templates', formTemplatesRouter);
  router.use('/forms', formRouter);
  router.use('/pdf', pdfRouter);
  router.use('/diagrams', diagramRouter);
  router.use('/payments', paymentRouter);
}

module.exports = routerApi;
