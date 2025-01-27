const Joi = require('joi');

const id = Joi.number().integer();
const xml = Joi.string().required();

const createDiagramSchema = Joi.object({
  xml
});

const updateDiagramSchema = Joi.object({
  xml
});

const getDiagramSchema = Joi.object({
  id: id.required()
});

module.exports = { createDiagramSchema, updateDiagramSchema, getDiagramSchema };