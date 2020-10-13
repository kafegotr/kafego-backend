export default (sequelize, DataTypes) => sequelize.define('fullness_percent', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
    required: true,
  },
  percent: {
    type: DataTypes.INTEGER,
    required: true,
    allowNull: false,
  },
  timestamp: {
    type: DataTypes.DATE,
    required: true,
    allowNull: false,
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
