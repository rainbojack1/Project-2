var Sequelize = require("sequelize");

module.exports = function(sequelize, DataTypes) {
  var Buddy = sequelize.define("Buddy", {
    firstName: DataTypes.STRING,
    lastName: DataTypes.TEXT,
    email: DataTypes.TEXT,
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
  });
  return Buddy;
};

// module.exports = Buddy;