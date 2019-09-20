var db = require("../models");

module.exports = function(app) {
  // Get all buddies
  app.get("/api/buddies", function(req, res) {
    db.Buddy.findAll({
      include: [
        {
          model: db.Interest,
          as: "interests",
          required: false,
          // Pass in the Interest attributes that you want to retrieve
          attributes: ["id", "name"],
          through: {
            // This block of code allows you to retrieve the properties of the join table
            model: db.BuddyInterests,
            as: "buddyInterests"
          }
        }
      ]
    }).then(function(dbBuddy) {
      res.json(dbBuddy);
    });
  });

  // Create a new Buddy
  app.post("/api/buddies", function(req, res) {
    console.log("New Buddy: ", req.body);
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
        console.log(req.body.interests);
        for (var i = 0; i < req.body.interests.length; i++) {
          console.log("=============HERE'S MY NEW BUDDY INTEREST=============");
          console.log(req.body.interests[i]);
          db.BuddyInterest.create({
            BuddyId: buddy.dataValues.id,
            InterestId: req.body.interests[i]
          })
            .then(response => {
              console.log("Success");
              console.log(response);
            })
            .catch(err => {
              console.log("Error");
              console.log(err);
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

  app.post("/api/search", function(req, res) {
    console.log(req.body);
    res.json(req.body);
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
