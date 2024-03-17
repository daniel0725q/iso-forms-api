const { Model, DataTypes, Sequelize } = require('sequelize');
const COMPANY_TABLE = 'company';

const CompanySchema = {
  id: {
    allowNull: false,
    autoIncrement: false,
    primaryKey: true,
    type: DataTypes.STRING
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  socialName: {
    allowNull: false,
    type: DataTypes.STRING
  },
  logo: {
    allowNull: true,
    type: DataTypes.STRING
  }
}

class Company extends Model {
  // static associate(models) {
  //   this.belongsTo(models.Role, { foreignKey: 'roleId' });
  //   this.hasOne(models.Customer, {
  //     as: 'customer',
  //     foreignKey: 'userId'
  //   });
  // }
static associate(models) {
    this.hasMany(models.User, {
      as: 'customer',
      foreignKey: 'userId'
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: COMPANY_TABLE,
      modelName: 'Company',
      timestamps: false
    }
  }
}


module.exports = { COMPANY_TABLE, CompanySchema, Company }