import Sequelize from 'sequelize';
import databaseConnection from '../../setup/databaseConnection';

const models = {
  User: databaseConnection.import('./user/user'),
  Address: databaseConnection.import('./address/address'),
  Contact: databaseConnection.import('./contact/contact'),
  Fullness_percent: databaseConnection.import('./fullness_percent/fullness_percent'),
};
/*
const models = [
  require('./user/user'),
  require('./contact/contact'),
  require('./fullness_percent/fullness_percent'),
  require('./address/address'),
];
*/

Object.keys(models).forEach((modelName) => {
  if ('associate' in models[modelName]) {
    models[modelName].associate(models);
  }
});

/*
for (const modelDefiner of models) {
  modelDefiner(databaseConnection);
}
*/

models.sequelize = databaseConnection;
models.Sequelize = Sequelize;

// associations
// models.Post.hasMany(models.Post);
// models.User.belongsTo(models.User);

export default models;
