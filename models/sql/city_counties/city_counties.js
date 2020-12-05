export default (sequelize, DataTypes) => sequelize.define('city-counties', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
    required: true,
  },
  city: {
    type: DataTypes.STRING,
  },
  county: {
    type: DataTypes.STRING,
  },
  plate: {
    type: DataTypes.INTEGER,
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
