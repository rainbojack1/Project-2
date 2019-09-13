// Get references to page elements
var $buddyText = $("#buddy-text");
var $buddyDescription = $("#buddy-description");
var $submitBtn = $("#submit");
var $buddyList = $("#buddy-list");

// The API object contains methods for each kind of request we'll make
var API = {
  saveExample: function(buddy) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/buddys",
      data: JSON.stringify(buddy)
    });
  },
  getExamples: function() {
    return $.ajax({
      url: "api/buddys",
      type: "GET"
    });
  },
  deleteExample: function(id) {
    return $.ajax({
      url: "api/buddys/" + id,
      type: "DELETE"
    });
  }
};

// refreshExamples gets new buddys from the db and repopulates the list
var refreshExamples = function() {
  API.getExamples().then(function(data) {
    var $buddys = data.map(function(buddy) {
      var $a = $("<a>")
        .text(buddy.id)
        .attr("href", "/buddy/" + buddy.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": buddy.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $buddyList.empty();
    $buddyList.append($buddys);
  });
};

// handleFormSubmit is called whenever we submit a new buddy
// Save the new buddy to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var buddy = {
    text: $buddyText.val().trim(),
    description: $buddyDescription.val().trim()
  };

  if (!(buddy.text && buddy.description)) {
    alert("You must enter an buddy text and description!");
    return;
  }

  API.saveExample(buddy).then(function() {
    refreshExamples();
  });

  $buddyText.val("");
  $buddyDescription.val("");
};

// handleDeleteBtnClick is called when an buddy's delete button is clicked
// Remove the buddy from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function() {
    refreshExamples();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$buddyList.on("click", ".delete", handleDeleteBtnClick);
