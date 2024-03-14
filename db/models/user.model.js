const { Model, DataTypes, Sequelize } = require('sequelize');
const bcrypt = require('bcrypt');
const { ROLE_TABLE } = require('./role.model')
const USER_TABLE = 'users';

const UserSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING
  },
  recoveryToken: {
    field: 'recovery_token',
    allowNull: true,
    type: DataTypes.STRING
  },
  roleId: {
    field: 'role_id',
    allowNull: false,
    type: Sequelize.DataTypes.INTEGER,
    unique: true,
    references: {
      model: ROLE_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW
  }
}

class User extends Model {
  // static associate(models) {
  //   this.belongsTo(models.Role, { foreignKey: 'roleId' });
  //   this.hasOne(models.Customer, {
  //     as: 'customer',
  //     foreignKey: 'userId'
  //   });
  // }
static associate(models) {
    this.belongsTo(models.Role, {foreignKey: 'roleId'});
      this.hasOne(models.Customer, {
      as: 'customer',
      foreignKey: 'userId'
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: 'User',
      timestamps: false,
      hooks:{
        beforeCreate: async (user) => {
          const password = await bcrypt.hash(user.password, 10);
          user.password = password;
        },
      }
    }
  }
}


module.exports = { USER_TABLE, UserSchema, User }
