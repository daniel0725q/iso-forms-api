const Joi = require('joi');

const email = Joi.string().email(),
  password = Joi.string().min(8),
  newPassword = Joi.string().min(8),
  token = Joi.string().regex(
    /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/=]*$/
  );

const loginAuthSchema = Joi.object({
  email: email.required(),
  password: password.required(),
});

const recoveryAuthSchema = Joi.object({
  email: email.required(),
});

const recoverPasswordAuthSchema = Joi.object({
  token: token.required(),
  password: password.required(),
});

const changePasswordAuthSchema = Joi.object({
  token: token.required,
  password: password.required(),
  newPassword: newPassword.required(),
});

const isAdminAuthSchema = Joi.object({
  token: token.required()
});

module.exports = {
  loginAuthSchema,
  recoveryAuthSchema,
  recoverPasswordAuthSchema,
  changePasswordAuthSchema,
  isAdminAuthSchema
};
