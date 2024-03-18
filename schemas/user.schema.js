const Joi = require('joi');

const id = Joi.number().integer();
const email = Joi.string().email();
const password = Joi.string().min(8);
const roleId = Joi.number().integer().max(3);
const companyId = Joi.number().integer();

const createUserSchema = Joi.object({
  email: email.required(),
  password: password.required(),
  roleId: roleId.required(),
  companyId: companyId.required()
});

const updateUserSchema = Joi.object({
  email: email,
  roleId: roleId,
});

const getUserSchema = Joi.object({
  id: id.required(),
});

module.exports = { createUserSchema, updateUserSchema, getUserSchema }
