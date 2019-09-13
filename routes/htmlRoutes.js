var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Buddy.findAll({}).then(function(dbBuddy) {
      res.render("index", {
        msg: "Study Buddy",
        buddies: dbBuddy
      });
    });
  });

  // Load buddy page and pass in an buddy by id
  app.get("/buddy/:id", function(req, res) {
    db.Buddy.findOne({ where: { id: req.params.id } }).then(function(
      dbBuddy
    ) {
      res.render("buddy", {
        buddy: dbBuddy
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
