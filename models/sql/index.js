import Sequelize from 'sequelize';
import databaseConnection from '../../setup/databaseConnection';

/*
const models = {
  User: databaseConnection.require('./user/user'),
  Address: databaseConnection.require('./address/address'),
  Contact: databaseConnection.require('./contact/contact'),
  Fullness_percent: databaseConnection.require('./fullness_percent/fullness_percent'),
};
*/

/*
const models= [
	require('./contact/contact'),
	require('./fullness_percent/fullness_percent'),
	require('./address/address')
];
*/
const models = require('./user/user');

Object.keys(models).forEach((modelName) => {
  if ('associate' in models[modelName]) {
    models[modelName].associate(models);
  }
});

models.sequelize = databaseConnection;
models.Sequelize = Sequelize;
console.log(models.user);

// associations
// models.Post.hasMany(models.Post);
// models.User.belongsTo(models.User);

export default models;
