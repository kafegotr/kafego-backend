export default (sequelize, DataTypes) => sequelize.define('contact', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
    required: true,
  },
  gsm: {
    type: DataTypes.STRING,
    required: true,
    allowNull: false,
  },
  tel: {
    type: DataTypes.STRING,
    required: false,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    required: true,
    allowNull: false,
  },
  FK_user_uuid: {
    type: DataTypes.UUID,
    required: true,
    allowNull: false,
    references: {
      model: 'user',
      key: 'uuid',
    },
  },
  createdAt: {
    type: DataTypes.DATE,
  },
  updatedAt: {
    type: DataTypes.DATE,
  },
  deletedAt: {
    type: DataTypes.DATE,
  },
});
