'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Track extends Model {
    static associate({Favorites, User}) {
      this.hasMany(Favorites, {foreignKey: 'trackId'})
      this.belongsTo(User, {foreignKey:'userId'})
    }
  }
  Track.init({
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    title: {
      type: DataTypes.TEXT,
      allowNull:false,
      unique: true,
    },
    artist: {
      type: DataTypes.TEXT,
      defaultValue: 'Неизветный исполнитель'
    },
    album: {
      type: DataTypes.TEXT,
      defaultValue: ''
    },
    filePath: {
      type: DataTypes.TEXT,
      allowNull:false,
    },
  }, {
    sequelize,
    modelName: 'Track',
  });
  return Track;
};