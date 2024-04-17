const Joi = require('joi');

const id = Joi.number().integer();
const version = Joi.string().min(1).max(20);
const form = Joi.object();
const title =  Joi.string().min(3).max(100);
const code = Joi.string();
const type = Joi.number();

const getFormTemplateSchema = Joi.object({
  id: id.required(),
});

const createFormTemplateSchema = Joi.object({
  version: version.required(),
  form: form.required(),
  title: title.required(),
  code: code.required(),
  type: type.required()
});

const copyFormTemplateSchema = Joi.object({
  version: version.required(),
  id: id.required(),
  title: title.required(),
  code: code.required(),
  type: type.required()
});

const updateFormTemplateSchema = Joi.object({
    version: version.required(),
    form: form.required(),
    title: title.required(),
    code: code.required(),
    type: type.required()
});

module.exports = { getFormTemplateSchema, createFormTemplateSchema, updateFormTemplateSchema, copyFormTemplateSchema };
