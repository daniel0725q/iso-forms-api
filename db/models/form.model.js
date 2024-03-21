const { Model, DataTypes, Sequelize } = require('sequelize');
const { USER_TABLE } = require('./user.model')

const FORM_TABLE = 'forms';

const FormSchema = {
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
  userId: {
    field: 'user_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    unique: true,
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
    this.hasOne(models.User, {
      foreignKey: 'userId'
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: FORM_TABLE,
      modelName: 'Role',
      timestamps: false
    }
  }
}


module.exports = { FORM_TABLE, FormSchema, Form };
