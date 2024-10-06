const boom = require('@hapi/boom');
const Sequelize = require('sequelize');
const { models } = require('../libs/sequelize');

class FormTemplateService {

  constructor() {}

  async find() {
    const rta = await models.FormTemplate.findAll();
    return rta;
  }

  async find(company) {
    const rta = await models.FormTemplate.findAll({
      where: Sequelize.or(
        { companyId: null },
        { companyId: company }
      )
    });
    return rta;
  }

  async findOne(id) {
    const company = await models.FormTemplate.findByPk(id);
    if (!company) {
      throw boom.notFound('customer not found');
    }
    return company;
  }

  async create(data) {
    const newCompany = await models.FormTemplate.create(data);
    return newCompany;
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

module.exports = FormTemplateService;
