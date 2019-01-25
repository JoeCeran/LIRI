
var NodeGeocoder = require("node-geocoder");
var inquirer = require("inquirer");

// Replace with your mapquest consumer API key
var options = {
  provider: "mapquest",
  apiKey: "YOUR-MAPQUEST-API-CONSUMER-KEY"
};

var geocoder = NodeGeocoder(options);


// Prompt the user to provide location information.
inquirer.prompt([

  {
    type: "list",
    name: "command",
    message: ["Look up band events", "Look up song info", "Look up movie info", "Do what it says"]
  }

// After the prompt, store the user's response in a variable called location.
]).then(function(user) {

    if (user.command == "Look up band events") {

    }
    else if (user.command == "Look up song info") {

    }
    else if (user.command == "Look up movie info") {

    }
    else if(user.command == "Do what it says") {

    }
});