const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');
const { Company } = require('../db/models/company.model');

class UserService {
  constructor() {}

  async create(data) {
    const newUser = await models.User.create(data);
    delete newUser.dataValues.password;
    return newUser;
  }

  async find() {
    const rta = await models.User.findAll(
      {include: [{model: models.Company, as: 'company'},
    {model: models.Role, as: 'role'}],
        attributes: 
        {exclude: ['password', 'createdAt', 'companyId', 'recoveryToken'],
      }})
    return rta;
  }

  async findByEmail(email) {
    const rta = await models.User.findOne({
      where: { email }
    });
    return rta;
  }
  async findOne(id) {
    const user = await models.User.findByPk(id);
    if (!user) {
      throw boom.notFound('user not found');
    }
    return user;
  }

  async update(id, changes) {
    const user = await this.findOne(id);
    const rta = await user.update(changes);
    return rta;
  }

  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy();
    return { id };
  }
}

module.exports = UserService;
