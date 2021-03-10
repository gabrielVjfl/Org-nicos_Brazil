'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Items extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Items.belongsToMany(models.Points, {
        through: 'PointsItems',
        as: 'points',
        foreignKey: 'itemId'
      })
    }
  };
  Items.init({
    title: DataTypes.STRING,
    name: DataTypes.TEXT,
    url: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Items',
  });
  return Items;
};