var db = require("../models");

module.exports = function(app) {
  // Get all buddies
  app.get("/api/buddies", function(req, res) {
    db.Buddy.findAll({}).then(function(dbBuddy) {
      res.json(dbBuddy);
      // console.log(dbBuddy);
    });
  });

  // Create a new Buddy
  app.post("/api/buddies", function(req, res) {
    db.Buddy.create(req.body).then(function(dbBuddy) {
      res.json(dbBuddy);
    });
  });

  // Delete an Buddy by id
  app.delete("/api/buddies/:id", function(req, res) {
    db.Buddy.destroy({ where: { id: req.params.id } }).then(function(dbBuddy) {
      res.json(dbBuddy);
    });
  });
};
