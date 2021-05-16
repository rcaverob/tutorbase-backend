/* eslint-disable */
import jwt from 'jwt-simple';
import dotenv from 'dotenv';
// import mongoose from 'mongoose';
import User from '../models/user_model';
import * as requestController from './request_controller';

dotenv.config({ silent: true });

export const signin = (req, res, next) => {
  console.log(req.user);
  res.send({
    token: tokenForUser(req.user),
    user: {
      name: req.user.name,
      year: req.user.year,
      email: req.user.email,
      requestedPostIDs: req.user.requestedPostIDs,
    },
  });
  next();
};

export const signup = (req, res, next) => {
  const { name } = req.body;
  const { year } = req.body;
  const { email } = req.body;
  const { password } = req.body;

  if (
    !name ||
    !year ||
    !email ||
    !password ||
    !email.toLowerCase().includes('dartmouth.edu')
  ) {
    res
      .status(422)
      .send(
        'You must provide a Dartmouth email and password, as well as a name and year.'
      );
    next();
  } else {
    // if user exists already, error
    User.find({ email })
      .then((user) => {
        if (user.length > 0) {
          // user already exists
          res.status(409).send('This email user already exists.');
          next();
        } else {
          // user does not exist yet; proceed
          const newUser = new User();
          newUser.name = name;
          newUser.year = year;
          newUser.email = email;
          newUser.password = password;
          newUser
            .save()
            .then((result) => {
              res.send({
                token: tokenForUser(result),
                user: {
                  name: result.name,
                  year: result.year,
                  email: result.email,
                  requestedPostIDs: result.requestedPostIDs,
                },
              });
              next();
            })
            .catch((err) => {
              res.status(500).json({ err });
              next(err);
            });
        }
      })
      .catch((err) => {
        res.status(500).json({ err });
        next(err);
      });
  }
};

export const acceptRequest = (req, res) => {
  const userID = req.user.id;
  const { requesterID } = req.body;
  const { requestID } = req.body;
  // eslint-disable-next-line consistent-return
  User.findById(userID, (err, user) => {
    if (err) return err;
    if (!user) return res.send();

    user.matches.push(requestID);

    // eslint-disable-next-line consistent-return
    user.save((err) => {
      if (err) return res.send(err);
      // eslint-disable-next-line consistent-return
      User.findById(requesterID, (err, requester) => {
        if (err) return err;
        if (!user) return res.send();

        requester.matches.push(requestID);
        requester.save((err) => {
          if (err) return res.send(err);
          requestController.deleteRequestUser(requestID);

          return res.send();
        });
      });
    });
  });
};

export const getMatches = (req, res) => {
  const userID = req.user.id;
  User.findById(userID)
    .populate({
      path: 'matches',
      // Get the requester's user info
      populate: { path: 'requester postID userID' },
    })
    .then((response) => {
      res.send(response);
    })
    .catch((error) => {
      res.send(error);
    });
};

// Add postID to list of posts that the user has requested to match
export const addRequestedPost = (req, res) => {
  const postID = req.body.postID;
  User.findByIdAndUpdate(
    req.user.id,
    { $push: { requestedUserIDs: postID } },
    { new: true }
  )
    .then((response) => {
      console.log('Addition of ID succesful!!');
      console.log(response);
      res.send(response);
    })
    .catch((error) => {
      res.send(error);
    });
};

// Clear all of the user's matches
export const clearMatches = (req, res) => {
  const { clearArray } = req.body;
  User.findByIdAndUpdate(req.user.id, { matches: clearArray }, { new: true })
    .then((response) => {
      res.send(response);
    })
    .catch((error) => {
      res.send(error);
    });
};

// encodes a new token for a user object
function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, process.env.AUTH_SECRET);
}
