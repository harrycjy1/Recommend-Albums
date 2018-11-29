'use strict';
module.exports = (sequelize, DataTypes) => {
  const Band = sequelize.define('Band', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    album: DataTypes.STRING,
    year: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {});
  Band.associate = function(models) {
    Band.belongsTo(models.User);
  };
  return Band;
};
