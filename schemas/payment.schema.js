const Joi = require('joi');

const id = Joi.number().integer();
const formTemplateId = Joi.number().integer().required();
const paymentId = Joi.string().required();
const status = Joi.string().required();
const companyId = Joi.number().integer().required();

const createPaymentSchema = Joi.object({
  formTemplateId,
  paymentId,
  status,
});

const updatePaymentSchema = Joi.object({
  formTemplateId,
  paymentId,
  status,
});

const getPaymentSchema = Joi.object({
  id: id.required()
});

module.exports = { createPaymentSchema, updatePaymentSchema, getPaymentSchema };