const { User, UserSchema } = require('./user.model');
const { Customer, CustomerSchema } = require('./customer.model');
const { Role, RoleSchema } = require('./role.model');
const { CompanySchema } = require('./company.model');
const { Company } = require('./company.model');
const { FormTemplate, FormTemplateSchema } = require('./formTemplate.model');
const { Form, FormSchema } = require('./form.model');
const { Diagram, DiagramSchema } = require('./diagram.model');
const { Payment, PaymentSchema } = require('./payment.model');


function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Customer.init(CustomerSchema, Customer.config(sequelize));
  Company.init(CompanySchema, Company.config(sequelize));
  Role.init(RoleSchema, Role.config(sequelize));
  FormTemplate.init(FormTemplateSchema, FormTemplate.config(sequelize));
  Form.init(FormSchema, Form.config(sequelize));
  User.associate(sequelize.models);
  Company.associate(sequelize.models);
  Customer.associate(sequelize.models);
  Form.associate(sequelize.models);
  Diagram.init(DiagramSchema, Diagram.config(sequelize));
  Diagram.associate(sequelize.models);
  Payment.init(PaymentSchema, Payment.config(sequelize));
  Payment.associate(sequelize.models);
}

module.exports = setupModels;
