const { Model, DataTypes, Sequelize } = require('sequelize');
const { USER_TABLE } = require('./user.model')
const { FORM_TEMPLATE_TABLE } = require('./formTemplate.model')

const FORM_TABLE = 'forms';

const FormSchema = {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.DataTypes.INTEGER
    },
    formId: {
      field: 'form_id',
      allowNull: false,
      type: Sequelize.DataTypes.INTEGER,
      references: {
        model: FORM_TEMPLATE_TABLE,
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    },
    data: {
      allowNull: false,
      type: Sequelize.DataTypes.JSON
    },
    userId: {
      field: 'user_id',
      allowNull: false,
      type: Sequelize.DataTypes.INTEGER,
      unique: false,
      references: {
        model: USER_TABLE,
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    }
}

class Form extends Model {
  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user'
    });
    this.belongsTo(models.FormTemplate, {
      foreignKey: 'form_id',
      as: 'formTemplate'
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: FORM_TABLE,
      modelName: 'Form',
      timestamps: false
    }
  }
}


module.exports = { FORM_TABLE, FormSchema, Form };
