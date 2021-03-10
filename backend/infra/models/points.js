'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Points extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Points.belongsToMany(models.Items, {
        through: 'PointsItems',
        as: 'items',
        foreignKey: 'pointId'
      })
    }
  };
  Points.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    telefone: DataTypes.STRING,
    latitude: DataTypes.FLOAT,
    longitude: DataTypes.FLOAT,
    city: DataTypes.STRING,
    uf: DataTypes.STRING,
    rua: DataTypes.STRING,
    bairro: DataTypes.STRING,
    numero: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Points',
  });
  return Points;
};