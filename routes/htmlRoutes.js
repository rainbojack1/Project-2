var db = require("../models");
var Sequelize = require("sequelize");
const Op = Sequelize.Op;

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
    db.Buddy.findOne({
      where: { id: req.params.id },
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
      res.render("buddy", {
        buddy: dbBuddy
      });
    });
  });

  // Render find page for any finding buddies
  app.get("/find", function(req, res) {
    db.Interest.findAll({}).then(function(dbInterest) {
      res.render("find", {
        msg: "Find a Buddy:",
        interests: dbInterest
      });
    });
  });

  var foundUserIds = [];
  // Render find page for any finding buddies
  app.get("/found", function(req, res) {
    var arrayOfIds = [1, 5];
    // var arrayOfUserIds = [99, 100];
    db.BuddyInterest.findAll({
      where: {
        InterestId: {
          [Op.in]: arrayOfIds
        }
      }
    }).then(function(dbBuddyInterest) {
      for (var i = 0; i < dbBuddyInterest.length; i++) {
        console.log(dbBuddyInterest[i].BuddyId);
        foundUserIds.push(dbBuddyInterest[i].BuddyId);
      }
    });
    console.log(foundUserIds);
    db.Buddy.findAll({
      where: {
        id: {
          [Sequelize.Op.in]: foundUserIds
        }
      },
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
      res.render("found", {
        msg: "Found Buddies:",
        buddies: dbBuddy
      });
    });
  });

  // db.Buddy.findAll({
  //   include: [
  //     {
  //       model: db.Interest,
  //       as: "interests",
  //       required: false,
  //       // Pass in the Interest attributes that you want to retrieve
  //       attributes: ["id", "name"],
  //       through: {
  //         // This block of code allows you to retrieve the properties of the join table
  //         model: db.BuddyInterests,
  //         where: {
  //           InterestId: {
  //             [Op.in]: arrayOfIds
  //           },
  //           BuddyId: {
  //             [Op.in]: arrayOfUserIds
  //           }
  //         },
  //         as: "buddyInterests",
  //         attributes: ["InterestId", "BuddyId"]
  //       }
  //     }
  //   ]

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
