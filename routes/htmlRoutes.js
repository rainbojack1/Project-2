var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    res.render("index", {
      msg: "My Study Buddy"
    });
  });

  // Load view all page
  app.get("/all", function(req, res) {
    db.Buddy.findAll({}).then(function(dbBuddy) {
      res.render("viewAll", {
        msg: "Find a Buddy",
        buddies: dbBuddy
      });
    });
  });

  // Load Create Account Page page
  app.get("/add", function(req, res) {
    res.render("add", {
      msg: "Add a Study Buddy"
    });
  });

  // Load buddy page and pass in an buddy by id
  app.get("/buddy/:id", function(req, res) {
    db.Buddy.findOne({ where: { id: req.params.id } }).then(function(dbBuddy) {
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
