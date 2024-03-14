const { User, UserSchema } = require('./user.model');
const { Customer, CustomerSchema } = require('./customer.model');
const { Role, RoleSchema } = require('./role.model');


function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Customer.init(CustomerSchema, Customer.config(sequelize));
  Role.init(RoleSchema, Role.config(sequelize));
  User.associate(sequelize.models);
  Customer.associate(sequelize.models);
}

module.exports = setupModels;
