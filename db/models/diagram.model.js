const { Model, DataTypes, Sequelize } = require('sequelize');
const DIAGRAM_TABLE = 'diagrams';

const DiagramSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  userId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: 'users',
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  companyId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: 'companies',
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  xml: {
    allowNull: false,
    type: DataTypes.TEXT
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
};

class Diagram extends Model {
  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'userId' });
    this.belongsTo(models.Company, { foreignKey: 'companyId' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: DIAGRAM_TABLE,
      modelName: 'Diagram',
      timestamps: true
    };
  }
}

module.exports = { DIAGRAM_TABLE, DiagramSchema, Diagram };