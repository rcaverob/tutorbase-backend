
# Tutor Base

![Team Photo](https://i.imgur.com/lxjmZfl.png)

Tutor Base is website designed to match Tutors and Tutees more efficiently with each other and create better tutor pairs based off of their needs.

## Architecture

The API is run using Nodejs, express, and MongoDB. 

### Code organization

* Different types of data (users, posts) are broken into individual [models](./models) and data manipulation is handled in their respective [controllers](./controllers)
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

### Using your own Heroku app

* Make sure you add the mLab resource in heroku
* If deploying using GitHub, follow the instructions in Heroku under the "Deploy" tab.
* If deploying using Heroku Git, make sure you intsall Heroku (`brew install heroku/brew/heroku`). This repo is already set up, so you just need to add a remote to Heroku (`heroku git:remote -a YOUR_HEROKU_APP`). Once you have commits ready to push to heroku, push using `git push heroku master` to deploy.

If you would like to run a local instance of the TutorBase frontend with this API, follow the deployment instructions on the [TutorBase frontend repo](https://github.com/dartmouth-cs52-20S/project-tutorbase#deployment)

## Authors

* Mike Zhou
* Nicolas Bergen
* Brittany Critchfield
* Joseph Notis
* Kimberly Rangel
* Rodrigo Cavero

## Acknowledgments

* Tim Tregubov
* The CS 52 TA Staff
* [CS 52 Lab 5, part 2](http://cs52.me/assignments/lab/redux-platform+auth/) for the authentication framework (passport, bcryptjs)
* [CS 52 Short Assignment 7](http://cs52.me/assignments/sa/server-side/) for how to deploy on heroku
server-side starterpack from the [cs52 server-side starterpack](https://github.com/dartmouth-cs52/express-babel-starter)
