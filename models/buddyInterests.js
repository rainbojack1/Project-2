module.exports = function(sequelize) {
  var BuddyInterest = sequelize.define("BuddyInterest", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    }
  });

  return BuddyInterest;
};
