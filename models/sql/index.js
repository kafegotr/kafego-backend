import Sequelize from 'sequelize';
import databaseConnection from '../../setup/databaseConnection';

const models = {
  User: databaseConnection.import('./user/user'),
  Address: databaseConnection.import('./address/address'),
  Contact: databaseConnection.import('./contact/contact'),
  Fullness_percent: databaseConnection.import('./fullness_percent/fullness_percent'),
};

/*
for (const modelDefiner of models) {
  modelDefiner(databaseConnection);
}
*/

models.Address.belongsTo(models.User, { foreignKey: 'users_uuid', as: 'users' });
models.Contact.belongsTo(models.User, { foreignKey: 'users_uuid', as: 'users' });
models.Fullness_percent.belongsTo(models.User, { foreignKey: 'users_uuid', as: 'users' });

Object.keys(models).forEach((modelName) => {
  if ('associate' in models[modelName]) {
    models[modelName].associate(models);
  }
});


models.sequelize = databaseConnection;
models.Sequelize = Sequelize;

// associations
// models.Post.hasMany(models.Post);
// models.User.belongsTo(models.User);

export default models;
