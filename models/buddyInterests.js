module.exports = function(sequelize, DataTypes) {
  var BuddyInterest = sequelize.define("BuddyInterest", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    }
  });

  return BuddyInterest;
};
