module.exports = function(sequelize) {
  var BuddyInterest = sequelize.define("BuddyInterest", {
    // buddyId: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false
    // },
    // interestId: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false
    // }
  });

  return BuddyInterest;
};
