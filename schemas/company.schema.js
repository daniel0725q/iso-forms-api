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
  socialName: socialName.required(),
  logo
});

const updateCompanySchema = Joi.object({
  id: id.required(),
  name: name.required(),
  socialName: socialName.required(),
  logo: logo.required()
});

const updateLogoCompanySchema = Joi.object({
  id,
  logo
});

module.exports = { getCompanySchema, createCompanySchema, updateCompanySchema };
