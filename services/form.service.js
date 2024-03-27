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

  async findByCompany(companyId) {
    try {
      // Find the company by its ID
      const company = await models.Company.findByPk(companyId);
  
      if (!company) {
        throw new Error('Company not found');
      }
  
      // Find all users belonging to the company
      const users = await models.User.findAll({
        where: { companyId: companyId }
      });
  
      // Extract user IDs from the fetched users
      const userIds = users.map(user => user.id);
  
      // Find all forms created by users from the company
      const forms = await models.Form.findAll({
        where: { userId: userIds }
      });
  
      return forms;
    } catch (error) {
      console.error('Error fetching forms:', error);
      throw error;
    }
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
