// add code to read and set any environment variables with the dotenv package:
require("dotenv").config();
var inquirer = require("inquirer");
var axios = require("axios");
var moment = require("moment");

// code required to import the keys.js file
// var keys = require("keys.js");

// require for Spotify node package
// var Spotify = require('node-spotify-api');

// access keys information
// var spotify = new Spotify(keys.spotify);

// Spotify search function
// spotify.search({ type: 'track', query: 'All the Small Things' }, function (err, data) {
//   if (err) {
//     return console.log('Error occurred: ' + err);
//   }

//   console.log(data);
// });

// spotify
//   .search({ type: 'track', query: 'All the Small Things' })
//   .then(function (response) {
//     console.log(response);
//   })
//   .catch(function (err) {
//     console.log(err);
//   });

// Uses inquirer to prompt user for artist they want to see then uses axios to call Bands In Town API
var showConcert = function () {

  inquirer.prompt([
    {
      name: "artist",
      message: "Who do you want to see?"
    },
  ]).then(function (answers) {
    
    var artist = answers.artist;

    var queryUrlBandsintown = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=";

    console.log(queryUrlBandsintown);
    
    axios.get(queryUrlBandsintown).then(
      function (response) {
          // console.log(response);
          for (var i = 0; i < 5; i++){
            console.log("--------------" + "\nVenue Name: " + response.data[i].venue.name + "\nVenue Location: " + response.data[i].venue.city + "\nEvent Date: " + moment(response.data[i].datetime).format("MM/DD/YYYY") + "\n--------------");
          }
        }
      );
    }
  )
}

showConcert()