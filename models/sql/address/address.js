export default (sequelize, DataTypes) => sequelize.define('address', {
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
  neighborhood: {
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
