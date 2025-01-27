const express = require('express');
const passport = require('passport');
const validationHandler = require('../middlewares/validator.handler');
const { createPaymentSchema, updatePaymentSchema, getPaymentSchema } = require('../schemas/payment.schema');
const PaymentService = require('../services/payment.service');
const jwt = require('jsonwebtoken');

const router = express.Router();
const service = new PaymentService();

router.get('/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const payments = await service.find();
      res.json(payments);
    } catch (error) {
      next(error);
    }
  }
);

router.get('/:id',
  passport.authenticate('jwt', { session: false }),
  validationHandler(getPaymentSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const payment = await service.findOne(id);
      res.json(payment);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  passport.authenticate('jwt', { session: false }),
  validationHandler(createPaymentSchema, 'body'),
  async (req, res, next) => {
    try {
      const authorization = req.headers.authorization;
      const token = authorization.substring(7);
      const userId = jwt.decode(token).uid;
      const companyId = jwt.decode(token).company;
      const body = req.body;
      body.companyId = companyId;
      const newPayment = await service.create(body);
      res.status(201).json(newPayment);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
  passport.authenticate('jwt', { session: false }),
  validationHandler(getPaymentSchema, 'params'),
  validationHandler(updatePaymentSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const payment = await service.update(id, body);
      res.json(payment);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id',
  passport.authenticate('jwt', { session: false }),
  validationHandler(getPaymentSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.status(200).json({ id });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;