const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class DiagramService {

  constructor() {}

  async create(data) {
    const newDiagram = await models.Diagram.create(data);
    return newDiagram;
  }

  async find(companyId) {
    const diagrams = await models.Diagram.findAll({
        where: { companyId: companyId }
      });
    return diagrams;
  }

  async findOne(id, companyId) {
    const diagram = await models.Diagram.findByPk(id);
    if (!diagram) {
      throw boom.notFound('Diagram not found');
    }
    if (diagram.companyId != companyId) {
      throw boom.forbidden('You do not have access to this resource');
    }
    return diagram;
  }

  async update(id, changes, companyId) {
    console.log("id-->" + id);
    const diagram = await models.Diagram.findByPk(id);
    console.log("HELLO", diagram);
    diagram.xml = changes.xml;
    console.log("-->" +diagram.companyId);
    if (diagram.companyId != companyId) {
      throw boom.forbidden('You do not have access to this resource');
    }
    const rta = await diagram.update(changes);
    return rta;
  }

  async delete(id, companyId) {
    const diagram = await this.findOne(id, companyId);
    if (diagram.companyId != companyId) {
      throw boom.forbidden('You do not have access to this resource');
    }
    await diagram.destroy();
    return { deleted: true };
  }
}

module.exports = DiagramService;