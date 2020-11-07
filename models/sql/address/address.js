export default (sequelize, DataTypes) => sequelize.define('addresses', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
    required: true,
  },
  city: {
    type: DataTypes.STRING,
    isEmail: true,
    required: true,
    allowNull: false,
  },
  county: {
    type: DataTypes.STRING,
    allowNull: false,
    required: true,
  },
  users_uuid: {
    type: DataTypes.UUID,
    required: true,
    allowNull: false,
    primaryKey: true,
    references: {
      model: 'users',
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
