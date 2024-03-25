const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(100);
const socialName = Joi.string().min(3).max(100);
const logo =  Joi.string();
const hasLogo = Joi.boolean();

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

const companyHasLogo = Joi.object({
  hasLogo
})

module.exports = { getCompanySchema, createCompanySchema, updateCompanySchema, companyHasLogo };
