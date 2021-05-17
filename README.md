# Tutor Base

Tutor Base is website designed to match Tutors and Tutees more efficiently with each other and create better tutor pairs based off of their needs.

API link: https://tutor-base.herokuapp.com/

Frontend Repo: https://github.com/rcaverob/tutorbase-frontend

## Architecture

The API is run using Nodejs, express, and MongoDB.

### Code organization

* Different types of data (users, posts) are broken into individual [models](./src/models) and data manipulation is handled in their respective [controllers](./src/controllers)
    * Models/controllers for users, posts, and requests

### Libraries used

* Mongoose to manage the MongoDB database
* bcryptjs used to salt and hash each user's password
* passport used to handle JWTs for authentication


## Setup

* Clone this repository using `git clone [REPO_URL]`
* in the root folder of the directory: `yarn install` to install project dependencies

## Deployment


### Using localhost

* run `yarn dev` in the API folder to deploy the server to [localhost:9090](https://localhost:9090) (if you changed the `port` in server.js, replace 9090 with the edited port)


## Authors

* Rodrigo Cavero
* Mike Zhou
* Nicolas Bergen
* Brittany Critchfield
* Joseph Notis
* Kimberly Rangel

## Acknowledgments

* Tim Tregubov
* The CS 52 TA Staff
* [CS 52 Lab 5, part 2](http://cs52.me/assignments/lab/redux-platform+auth/) for the authentication framework (passport, bcryptjs)
* [CS 52 Short Assignment 7](http://cs52.me/assignments/sa/server-side/) for how to deploy on heroku
server-side starterpack from the [cs52 server-side starterpack](https://github.com/dartmouth-cs52/express-babel-starter)
