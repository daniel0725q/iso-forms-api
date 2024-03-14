const Joi = require('joi');

const id = Joi.number().integer();
const email = Joi.string().email();
const password = Joi.string().min(8);
const roleId = Joi.number().integer().max(1);

const createUserSchema = Joi.object({
  email: email.required(),
  password: password.required(),
  roleId: roleId.required(),
});

const updateUserSchema = Joi.object({
  email: email,
  roleId: roleId,
});

const getUserSchema = Joi.object({
  id: id.required(),
});

module.exports = { createUserSchema, updateUserSchema, getUserSchema }
