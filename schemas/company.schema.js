const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(100);
const socialName = Joi.string().min(3).max(100);
const logo =  Joi.string();

const getCompanySchema = Joi.object({
  id: id.required(),
});

const createCompanySchema = Joi.object({
  id: id.required(),
  name: name.required(),
  socialName: socialName.required()
});

const updateCompanySchema = Joi.object({
  id: id.required(),
  name,
  socialName,
  logo
});

const updateLogoCompanySchema = Joi.object({
  id,
  logo
});

module.exports = { getCompanySchema, createCompanySchema, updateCompanySchema };
