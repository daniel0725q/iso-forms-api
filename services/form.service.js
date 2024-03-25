const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class FormService {

  constructor() {}

  async find() {
    const rta = await models.Form.findAll();
    return rta;
  }

  async findOne(id) {
    const form = await models.Form.findByPk(id, {
      include: [{model: models.FormTemplate, as: 'formTemplate'},
      {model: models.User, as: 'user'}],
        attributes: {exclude: ['form_id']}
    });
    if (!form) {
      throw boom.notFound('customer not found');
    }
    return form;
  }

  async findByUser(userId) {
    const form = await models.Form.findAll(
      {
        where: {
        userId: userId,
        },
        include: [{model: models.FormTemplate, as: 'formTemplate'}],
        attributes: {exclude: ['data', 'form_id', 'user_id']}
    });
    if (!form) {
      throw boom.notFound('customer not found');
    }
    return form;
  }

  async create(data) {
    const newForm = await models.Form.create(data);
    return newForm;
  }

  async update(id, changes) {
    const model = await this.findOne(id);
    const rta = await model.update(changes);
    return rta;
  }

  async delete(id) {
    const model = await this.findOne(id);
    await model.destroy();
    return { deleted: true };
  }

}

module.exports = FormService;
