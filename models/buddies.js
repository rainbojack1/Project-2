module.exports = function(sequelize, DataTypes) {
  var Buddy = sequelize.define("Buddy", {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });

  Buddy.associate = function(models) {
    Buddy.hasMany(models.Interest, {});
  };
  return Buddy;
};