const Joi = require('joi');

const id = Joi.number().integer();
const formId = Joi.number().integer();
const data = Joi.object();
const userId = Joi.number();

const getFormSchema = Joi.object({
  id: id.required(),
});

const createFormSchema = Joi.object({
  data: data.required(),
  formId: formId.required(),
});

const updateFormSchema = Joi.object({
  data: data.required(),
  formId: formId.required()
});

module.exports = { getFormSchema, createFormSchema, updateFormSchema };
