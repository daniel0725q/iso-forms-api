const { Model, DataTypes, Sequelize } = require('sequelize');
const PAYMENT_TABLE = 'payments';

const PaymentSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  formTemplateId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: 'form_templates',
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  paymentId: {
    allowNull: false,
    type: DataTypes.STRING
  },
  status: {
    allowNull: false,
    type: DataTypes.STRING
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
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  applied: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
};

class Payment extends Model {
  static associate(models) {
    this.belongsTo(models.FormTemplate, { foreignKey: 'formTemplateId' });
    this.belongsTo(models.Company, { foreignKey: 'companyId' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PAYMENT_TABLE,
      modelName: 'Payment',
      timestamps: true
    };
  }
}

module.exports = { PAYMENT_TABLE, PaymentSchema, Payment };