module.exports = function(sequelize, DataTypes) {
  var Interest = sequelize.define("Interest", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });
  Interest.associate = function(models) {
    Interest.belongsToMany(models.Buddy, {
      through: models.BuddyInterest,
      as: "interests"
    });
  };

  return Interest;
};
