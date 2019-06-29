// add code to read and set any environment variables with the dotenv package:
require("dotenv").config();

// Require methods for json package files
var fs = require("fs");
var inquirer = require("inquirer");
var axios = require("axios");
var moment = require("moment");
var Spotify = require('node-spotify-api');

// code required to import the keys.js file
var keys = require("./keys.js");

// access keys information
var spotify = new Spotify(keys.spotify);
var bintId = keys.bintId;
var searchType = process.argv[2]
// var searchWord = process.argv[3]

var showSong = function () {

  inquirer.prompt([
    {
      name: "song",
      message: "What song do you want to find?"
    },
  ]).then(function (answers) {
  spotify
    .search({ type: 'track', query: answers.song, limit:5})
    .then(function (response) {

      var songs = response.tracks.items
      
      for (var i = 0; i < songs.length; i++){
        var artist = songs[i].artists[0].name;
        var songTitle = songs[i].name;
        var albumName = songs[i].album.name;
        var songPreview = songs[i].preview_url.split("=")[0];
  
        console.log("--------------" + "\nArtist: " + artist + "\nSong Title: " + songTitle + "\nSong Preview: " + songPreview + "\nAlbum Name: " + albumName + "\n--------------")
      }
    })
    .catch(function (err) {
      console.log(err);
    });
  })
}


// Uses inquirer to prompt user for artist they want to see then uses axios to call Bands In Town API
var showConcert = function () {

  inquirer.prompt([
    {
      name: "artist",
      message: "Who do you want to see?"
    },
  ]).then(function (answers) {
    
    var artist = answers.artist;

    var queryUrlBandsintown = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=" + bintId;

    console.log(queryUrlBandsintown);
    
    axios.get(queryUrlBandsintown).then(
      function (response) {
          for (var i = 0; i < 5; i++){
            console.log("--------------" + "\nVenue Name: " + response.data[i].venue.name + "\nVenue Location: " + response.data[i].venue.city + "\nEvent Date: " + moment(response.data[i].datetime).format("MM/DD/YYYY") + "\n--------------");
          }
        }
      );
    }
  )
}

var doThis = function () {
  
    fs.readFile("random.txt", "utf8", function (error, data) {
  
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

    // Calls spotify API
    spotify
      .search({ type: 'track', query: dataArr[1], limit: 5 })
      .then(function (response) {

        var songs = response.tracks.items

        for (var i = 0; i < songs.length; i++) {
          var artist = songs[i].artists[0].name;
          var songTitle = songs[i].name;
          var albumName = songs[i].album.name;
          var songPreview = songs[i].preview_url.split("=")[0];

          console.log("--------------" + "\nArtist: " + artist + "\nSong Title: " + songTitle + "\nSong Preview: " + songPreview + "\nAlbum Name: " + albumName + "\n--------------")
        }
      })
      .catch(function (err) {
        console.log(err);
      });
  });
}


switch (searchType) {
  case "concert-this":
    showConcert();
    break;

  case "spotify-this-song":
    showSong();
    break;

  case "do-this":
    doThis();
    break;

  default:
    console.log("Not a recognized command");
}