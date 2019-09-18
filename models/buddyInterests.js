module.exports = function(sequelize, DataTypes) {
  var BuddyInterest = sequelize.define("BuddyInterest", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    }
    // BuddyId: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   validate: {
    //     len: [1]
    //   }
    // },
    // InterestId: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    //   validate: {
    //     len: [1]
    //   }
    // }
  });

  return BuddyInterest;
};
