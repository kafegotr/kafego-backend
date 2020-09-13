const { DataTypes } = require('sequelize');

export default (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
  uuid: {
    type: DataTypes.UUID,
    required: true,
    primaryKey: true,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    isEmail: true,
    required: true,
    unique: true,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    required: true,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    required: true,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    required: true,
    allowNull: false,
  },
  photo: {
    type: DataTypes.STRING,
    required: true,
    allowNull: false,
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
return user;
};
