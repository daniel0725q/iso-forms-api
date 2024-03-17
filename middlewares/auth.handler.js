const boom = require('@hapi/boom');

const { config } = require('./../config/config');

// function checkApiKey(req, res, next) {
//   const apiKey = req.headers['api'];
//   if (apiKey === config.apiKey) {
//     next();
//   } else {
//     next(boom.unauthorized());
//   }
// }

function checkAdminRole(req, res, next) {
  const user = req.user;
  if (user.role === 1) {
    next();
  } else {
    next(boom.unauthorized());
  }
}

function checkRoles(...roles) {
  return (req, res, next) => {
    const user = req.user;
    console.log(roles);
    console.log(user.role);
    if (roles.includes(user.role)) {
      next();
    } else {
      next(boom.unauthorized());
    }
  }
}

module.exports = {checkAdminRole, checkRoles }
