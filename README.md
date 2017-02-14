# Membrain Documentation

Find the deployed version of Membrain at: [membrain.herokuapp.com](http://membrain.herokuapp.com)

Membrain runs on the following tech stack:
- Node.js
- Express
- React
- MongoDB
- Mongoose

To start the application on a local machine:

1. Run 'npm install'.
2. Run 'npm install webpack -g'.
3. Run 'webpack --watch', 'npm start', and mongoDB on a final terminal window.

## Contributing
[Contribution guidelines for this project](CONTRIBUTING.md)

## Style Guide
[Style guidelines for this project](STYLE-GUIDE.md)

## Project Inheritance ##

Our team inherited a small codebase with a vision to make a collection of educational games. We expanded the project with 7 new games, word of the day, a chat client, and leaderboard.

## Main Components: (/client/src/components) ##

- index.js:
React Router is used to serve multiple routes/pages and is the hub of all components.

- App.js:
Template into which components are injected. The navbar is initialized here.

- NavBar.js:
Contains links to the homepage, leaderboard, all the games, profile, and sign-in/sign-up components.

- Leaderboard.js: Main component for the leaderboard. Gets the highscores from the Renders each game's leaderboard using GameLeaderboard.js.

- GameLeaderboard.js: Renders a leaderboard table for the specified game.

- Profile.js: Displays a user's individual profile with game score history and topscore.

### Homepage (/homepage) ###
- Homepage.js: Displays a welcome banner and renders the homepage subcomponents.

#### ChatClient (/ChatClient) ####
- ChatClient.js: Connects to socket.io and allows sending and receiving chat messages. Renders the chat client.

#### Popular Games ####
- PopularGames.js: Displays a list of links for popular games

#### Word of the Day ####
- WordOfTheDay.js: Gets the word of the day from the wordnik API and renders the word, part of speech, and definition.

### Authentication (/authentication) ###
- SignUp.js:
This component is a sign up form that makes POST requests with a user's username and password.
In order to keep the user login persistent, the username is stored in local storage.

- Login.js:
This component is similar to SignUp.js but is a login form instead.

### Games: (/Games) ###

#### GameMemory (Card matching): ####
- GameMemory.js: The main component storing the state of the game board
- GameMemoryCard.js: A single card

#### MasterMind ####
- Description goes here

#### MemorizeTiles (Memorize a tile pattern) ####
- MemorizeTiles.js: The main component storing the state of the game board and all logical interactions and rendering the game

#### ReactionCircle (Reaction testing) ####
- ReactionCircle.js: Contains all logic and rendering for the game

#### Scramble (Unscramble the word with a definition) ####
- Data.js: JSON data of words and definitions
- GameScramble.js: The main component and storage of state for the game
- Score.js: Score component for the game
- Timer.js: Timer component for the game

#### Simon ####
- Description goes here

#### Sudoku ####
- Description goes here

#### TypingSpeedmaster (Speed typing) ####
- TypingSpeedmaster.js: The main component of the game. Makes a GET request to the numbersapi.com API for random trivia text.

## Back-End Components: ##

   server/users/userModel.js:
    User information is stored in a MongoDB using Mongoose as an ORM. The schema accepts a unique username field as a string (required) and a password as a string (required). User scores are recorded in an array, with the highest scores of each game in their own property. For each new game added, create a new field for the new game scores array and new game high score.

   server/users/userController.js:
    All methods that interact directly with the database are defined in userController.js. For each new game added update the getUser controller userObject to include the new game high score and array to hold all scores.

   server/server.js:
    Handles all post/get requests and connections to the DB. Also determines what route is chosen when the user clicks on 'profile' page depending on whether or not they're logged in.

    API V2 refactors the routes from the original API to a more RESTful model.

    EX:
    V1: /leaderboard is now
    V2: /api/v2/leaderboard/:gametype
    API V2 is more specific in exposing a route that returns a leaderboard for one game specified in the gametype parameter.
