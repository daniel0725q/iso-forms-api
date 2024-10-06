const { Model, DataTypes, Sequelize } = require('sequelize');
const { COMPANY_TABLE } = require('./company.model')

const FORM_TEMPLATE_TABLE = 'form_templates';

const FormTemplateSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  version: {
    allowNull: false,
    type: DataTypes.STRING
  },
  form: {
    allowNull: false,
    type: DataTypes.JSON
  },
  title: {
    allowNull: false,
    type: DataTypes.STRING
  },
  code: {
    allowNull: false,
    type: DataTypes.STRING
  },
  type: {
    allowNull: false,
    type: Sequelize.DataTypes.INTEGER
  },
  companyId: {
    field: 'company_id',
    allowNull: true,
    type: Sequelize.DataTypes.INTEGER,
    references: {
      model: COMPANY_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  }
}

class FormTemplate extends Model {
  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user'
    });
    this.belongsTo(models.Company, {
      foreignKey: 'company_id',
      as: 'company'
    })
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: FORM_TEMPLATE_TABLE,
      modelName: 'FormTemplate',
      timestamps: false
    }
  }
}


module.exports = { FORM_TEMPLATE_TABLE, FormTemplateSchema, FormTemplate };
