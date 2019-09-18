var db = require("../models");

module.exports = function(app) {
  // Get all buddies
  app.get("/api/buddies", function(req, res) {
    db.Buddy.findAll({}).then(function(dbBuddy) {
      res.json(dbBuddy);
    });
  });

  // Create a new Buddy
  app.post("/api/buddies", function(req, res) {
    // console.log(req.body);
    db.Buddy.findOrCreate({
      where: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
      }
    })
      .then(([buddy, created]) => {
        console.log(
          buddy.get({
            plain: true
          })
        );
        console.log(created);
        // console.log(buddy);
        for (var i = 0; i < req.body.interests.length; i++) {
          db.BuddyInterest.create({
            BuddyId: buddy.id,
            InterestId: req.body.interests[i]
          });
        }
      })
      .then(function(dbBuddy) {
        res.json(dbBuddy);
      });
  });

  // Delete an Buddy by id
  app.delete("/api/buddies/:id", function(req, res) {
    db.Buddy.destroy({ where: { id: req.params.id } }).then(function(dbBuddy) {
      res.json(dbBuddy);
    });
  });

  // Get Intrests
  app.get("/api/interests", function(req, res) {
    db.Interest.findAll({}).then(function(dbInterest) {
      res.json(dbInterest);
    });
  });

  // Create a new Interest
  app.post("/api/interests", function(req, res) {
    console.log("req.body: ", req.body);
    db.Interest.findOrCreate({ where: { name: req.body.name } })
      .then(([interest, created]) => {
        console.log(
          interest.get({
            plain: true
          })
        );
        console.log(created);
      })
      .then(function(dbInterest) {
        res.json(dbInterest);
      });
  });
};
