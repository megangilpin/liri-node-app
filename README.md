# LIRI Bot 👾

### Overview

IRI is a Language Interpretation and Recognition Interface. LIRI is a command line node app that takes in parameters, calls Bands in Town, Spotify or the OMDB API to give the user back information based on the parameters given.

### Functionality Breakdown
1. User calls the node file in the command line and types one of the following commands
    1. concert-this
    2. spotify-this-song
    3. movie-this
    4. do-what-it-says
    
2. Each command will do the following:
    1. Call a function that initiates Inquirer to prompt the user a question about what they want to search
    2. Once the user has input the answer, it will run an API call
    3. All API keys are hidden in a .gitignore and retrieved through requiring the correct .js file then referencing .env file hidden in the .gitignore.
    3. Data is retrieved from the API then appended to a .txt file
    4. Finally the data is displayed to the user in the terminal
    
### Technology Used
1. Node-Spotify-API
2. Inquirer
3. Axios
4. Moment
5. DotEnv
6. File-system (fs)

### Line Commands Rundowns
    
###### concert-this -  Bands in Town Artist Events API
1. Prompts the user to answer "Who do you want to see?".
2. Utilizes the Axios npm to call to the Bands in Town Artist Events API and search for the concert.
3. Retrieves the following data, uses the file-system npm to write it to the log.txt file then display it to the user:
    * Name of the venue.
    * Venue location.
    * Date of the Event (uses moment to format this as "MM/DD/YYYY").
        
 ###### spotify-this-song -  Spotify API
1. Prompts the user to answer "What song do you want to find?".
2. Calls the Spotify API and search for the song.
3. Retrieves the following data, uses the file-system npm to write it to the log.txt file then display it to the user:
    * Artist(s).
    * The song's name.
    * A preview link of the song from Spotify.
    * The album that the song is from.
        
###### movie-this -  OMDB API
1. Prompts the user to answer "What movie do you want to know about?".
2. Utilizes the Axios npm to call to the OMDB API and search for the movie.
3. Retrieves the following data, uses the file-system npm to write it to the log.txt file then display it to the user:
    * Title of the movie.
    * Year the movie came out.
    * IMDB Rating of the movie. 
    * Rotten Tomatoes Rating of the movie.
    * Country where the movie was produced. 
    * Language of the movie.
    * Plot of the movie.
    * Actors in the movie.
4. If a movie is not picked the function will default to output data for the movie 'Mr. Nobody.'

###### do-what-it-says
1. Using the fs npm, to take the text inside random.txt.
2. Then calls spotify-this-song for using the text from random.txt as the search parameter.











