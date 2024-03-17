const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class CompaniesService {

  constructor() {}

  async find() {
    const rta = await models.Company.findAll();
    return rta;
  }

  async findOne(id) {
    const company = await models.Company.findByPk(id);
    if (!user) {
      throw boom.notFound('customer not found');
    }
    return company;
  }

  async create(data) {
    const newCompany = await models.Customer.create(data, {
      include: ['company']
    });
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
    return { rta: true };
  }

}

module.exports = CompaniesService;
