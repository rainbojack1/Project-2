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
    db.Buddy.findAll({
      include: [
        {
          model: db.Interest,
          as: "interests",
          required: false,
          // Pass in the Product attributes that you want to retrieve
          attributes: ["id", "name"],
          through: {
            // This block of code allows you to retrieve the properties of the join table
            model: db.BuddyInterests,
            as: "buddyInterests"
          }
        }
      ]
    }).then(function(dbBuddy) {
      res.render("viewAll", {
        msg: "All Buddies:",
        buddies: dbBuddy
      });
    });
  });

  // Load Admin View all page
  app.get("/admin", function(req, res) {
    db.Buddy.findAll({}).then(function(dbBuddy) {
      res.render("admin", {
        msg: "ADMIN view:",
        buddies: dbBuddy
      });
    });
  });

  // Load Create Account Page page
  app.get("/add", function(req, res) {
    db.Interest.findAll({}).then(function(dbInterest) {
      res.render("add", {
        msg: "Add a Study Buddy",
        interests: dbInterest
      });
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

  // app.get("/find", function(req, res) {
  //   db.Buddy.findAll({}).then(function(dbBuddy) { Instead of dbbuddy put the name of the joined database
  //     res.render("viewAll", {
  //       msg: "Find a Buddy:",
  //       //DATABASE HERE
  //     });
  //   });
  // });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
