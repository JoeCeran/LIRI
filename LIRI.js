require("dotenv").config();

var inquirer = require("inquirer");
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var artist;




// Prompt the user to provide location information.
inquirer.prompt([

  {
    type: "list",
    name: "command",
    message: "What would you like to do?",
    choices: ["Look up band events", "Look up song info", "Look up movie info", "Do what it says"]
  }

// After the prompt, decideds which choice was chosen
]).then(function(user) {

    if (user.command == "Look up band events") {
        inquirer.prompt([
            {
                type: "input",
                name: "userInput",
                message: "What band's events would you like to look up?"
            } 
            ]).then(function (user) {
            concertThis(user.userInput);
            })
    } else if (user.command == "Look up song info") {
        inquirer.prompt([
            {
                type: "input",
                name: "userInput",
                message: "What song would you like to look up?",
            }
            ]).then(function (user) {
            spotifyThis(user.userInput);
            })
    }
    else if (user.command == "Look up movie info") {
        inquirer.prompt([
            {
                type: "input",
                name: "userInput",
                message: "What movie would you like to look up?",
            }
            ]).then(function(user) {  
            movieThis(user.userInput);
            })
    }
    else if(user.command == "Do what it says") {
    doWhatItSays();
    }
});

// Runs the bands in town API
    function concertThis(artist) {
        if (artist != ""){     
        let queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
        axios.get(queryUrl).then(function (response) {
           
                for (let i = 0; i < 5; i++) {
                    console.log ("Venue: " +  response.data[i].venue.name);
                    console.log ("Location: " +  response.data[i].venue.city);
                    console.log ("Date: " +  moment(response.data[i].datetime).format("MM/DD/YYYY"));
                    console.log (" ");
                }
              })
            }
        else {
            console.log("Cher");
            let queryUrl = "https://rest.bandsintown.com/artists/Cher/events?app_id=codingbootcamp";
            axios.get(queryUrl).then(function (response) {
            
                    for (let i = 0; i < 5; i++) {
                        console.log ("Venue: " +  response.data[i].venue.name);
                        console.log ("Location: " +  response.data[i].venue.city);
                        console.log ("Date: " +  moment(response.data[i].datetime).format("MM/DD/YYYY"));
                        console.log (" ");
                    }
                })
            }
        };
    
    // Runs the Spotify API
    function spotifyThis(song) {       
                // We then run the request with axios module on a URL with a JSON
                if (song != ""){
                spotify
                .search({ type: 'track', query: song })
                .then(function(response) {
                    for (let i = 0; i < 5; i++){
                    console.log("Artists: " + response.tracks.items[i].artists[0].name);
                    console.log("Song name: " + response.tracks.items[i].name);
                    console.log("Preview Link: " + response.tracks.items[i].preview_url);
                    console.log("Album: " + response.tracks.items[i].album.name);
                    }
                })
            }
            else {
                console.log("The Sign, Ace of Base");
            spotify
                .search({ type: 'track', query: "the sign ace of base" })
                .then(function(response) {
                    
                    console.log("Artists: " + response.tracks.items[0].artists[0].name);
                    console.log("Song name: " + response.tracks.items[0].name);
                    console.log("Preview Link: " + response.tracks.items[0].preview_url);
                    console.log("Album: " + response.tracks.items[0].album.name);
                    
                })
            }
        };
    //Runs the OMBD API
    function movieThis(movie) {
    
            if (movie != ""){ 
            // We then run the request with axios module on a URL with a JSON
            axios.get("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy").then(function(response) {
                // Then we print out the imdbRating
                console.log("Movie title: " + response.data.Title);
                console.log("Year: " + response.data.Year);
                console.log("imdb rating: " + response.data.imdbRating);
                console.log("Rotten Tomatos rating: " + response.data.Ratings[1].Value);
                console.log("Country: " + response.data.Country);
                console.log("Language: " + response.data.Language);
                console.log("Plot: " + response.data.Plot);
                console.log("Actors: " + response.data.Actors);
            })
            }
            else {
                axios.get("http://www.omdbapi.com/?t=Mr.Nobody&y=&plot=short&apikey=trilogy").then(function(response) {
                    // Then we print out the imdbRating
                    console.log("Have you seen Mr.Nobody?");
                    console.log("It's on Netflix!");
                    console.log("Movie title: " + response.data.Title);
                    console.log("Year: " + response.data.Year);
                    console.log("imdb rating: " + response.data.imdbRating);
                    console.log("Rotten Tomatos rating: " + response.data.Ratings[1].Value);
                    console.log("Country: " + response.data.Country);
                    console.log("Language: " + response.data.Language);
                    console.log("Plot: " + response.data.Plot);
                    console.log("Actors: " + response.data.Actors);
                })
            }
        }
    // Runs the do what it says command
    var doWhatItSays = function() {
    fs.readFile("random.txt", "utf8", function(error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
          return console.log(error);
        }
      
        // We will then print the contents of data
        console.log(data);
      
        // Then split it by commas (to make it more readable)
        var dataArr = data.split(",");
      
        // We will then re-display the content as an array for later use.
        console.log(dataArr);
        var randomNum = Math.floor(Math.random() * 3);
            if (randomNum == 0) {
            concertThis(dataArr);
            }
            else if (randomNum == 1){
            spotifyThis(dataArr);   
            }
            else if (randomNum == 2){
            movieThis(dataArr);
            }
            else{
                console.log(randomNum);
            }
      });          
    }