'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Favorites extends Model {
    static associate({User, Track}) {
      this.belongsTo(User, {foreignKey: 'userId'});
      this.belongsTo(Track, {foreignKey: 'trackId'});
    }
  }
  Favorites.init({
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Users",
        key: 'id'
      }
    },
    trackId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Tracks",
        key: "id"
      }
    },
  }, {
    sequelize,
    modelName: 'Favorites',
  });
  return Favorites;
};