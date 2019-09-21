module.exports = function(sequelize, DataTypes) {
  var BuddyInterest = sequelize.define("BuddyInterest", {
    BuddyId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    InterestId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  BuddyInterest.removeAttribute("id");

  return BuddyInterest;
};
