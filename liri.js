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

// Writes info to log.txt file then displays info in the terminal
function writeFile(info) {
  fs.appendFile("log.txt", info, function (err) {
    if (err) {
      console.log(err);
    }
    else {
      console.log(info)
    }
  });
}

// Calls the Spotify api then uses the write file function
function spotifySearch(song) {
  spotify.search({ type: 'track', query: song, limit: 5 })
    .then(function (response) {

      var songs = response.tracks.items
      var info = "\nType of search: " + searchType + "\nSong Searched: " + song;

      for (var i = 0; i < songs.length; i++) {
        var songPreview = songs[i].preview_url;
        if (songs[i].preview_url) {
          songPreview = songs[i].preview_url.split("=")[0]
        }
        info += "\n--------------" + "\nArtist: " + songs[i].artists[0].name + "\nSong Title: " + songs[i].name + "\nSong Preview: " + songPreview + "\nAlbum Name: " + songs[i].album.name + "\n--------------"
      }

      // Writes info to log.txt file then displays info in the terminal
      writeFile(info)
  })
  .catch(function (err) {
    console.log(err);
  });
}

// Uses inquirer to prompt user for song they want to hear then calls searchSpotify()
var showSong = function () {
  inquirer.prompt([
    {
      name: "song",
      message: "What song do you want to find?"
    },
  ]).then(function (answers) {
    var song = answers.song
    spotifySearch(song)
  })
}  

// Uses inquirer to prompt user for Movie they want to hear then calls OMDB API
var showMovie = function () {
  inquirer.prompt([
    {
      name: "movie",
      message: "What movie do you want to know about?"
    },
  ]).then(function (answers) {

    var movieTitle = answers.movie;
    var queryUrl = "http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&apikey=trilogy";
  
    // This line is just to help us debug against the actual URL.
  
    axios.get(queryUrl).then(
      function (response) {
        var info = "\nType of search: " + searchType + "\nMovie Searched : " + movieTitle + "\n--------------" + "\nMovie Title: " + response.data.Title + "\nMovie Release Date: " + response.data.Released + "\nIMDB Rating: " + response.data.Ratings[0].Value + "\nRotten Tomatoes Rating: " + response.data.Ratings[1].Value + "Country produced in: " + response.data.Country + "\nPlot of " + movieTitle + " : " + response.data.Plot + "\nActors in " + movieTitle + " : " + response.data.Actors + "\n--------------";

      // Writes info to log.txt file then displays info in the terminal
        writeFile(info)
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response)
        }
        else {
          console.log("Are you sure " + movieTitle + " is a Movie Title?")
        }
      });
  });
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

    axios.get(queryUrlBandsintown).then(
      function (response) {
        var info = "\nType of search: " + searchType + "\nBand you want to see: " + artist;
        for (var i = 0; i < 5; i++){
          info += "\n--------------"  + "\nVenue Name: " + response.data[i].venue.name + "\nVenue Location: " + response.data[i].venue.city + "\nEvent Date: " + moment(response.data[i].datetime).format("MM/DD/YYYY") + "\n--------------";
        }
      // Writes info to log.txt file then displays info in the terminal
      writeFile(info)
    }) 
  })
}

// Calls the Spotify using the the listed with ing the Random.txt file
var doThis = function () {
  
  fs.readFile("random.txt", "utf8", function (error, data) {
  if (error) {
    return console.log(error);
  }
    var dataArr = data.split(",");
    var song = dataArr[1]
    // Calls spotify API
    spotifySearch(song)
  });
}

// switch statement to call the functions depending on what the user types
switch (searchType) {
  case "concert-this":
    showConcert();
    break;

  case "spotify-this-song":
    showSong();
    break;

  case "movie-this":
    showMovie();
    break;

  case "do-what-it-says":
    doThis();
    break;

  default:
    console.log("Not a recognized command");
}