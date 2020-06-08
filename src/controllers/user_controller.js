import jwt from 'jwt-simple';
import dotenv from 'dotenv';
// import mongoose from 'mongoose';
import User from '../models/user_model';
import * as requestController from './request_controller';

dotenv.config({ silent: true });

export const signin = (req, res, next) => {
  res.send({ token: tokenForUser(req.user) });
  next();
};

export const signup = (req, res, next) => {
  const { name } = req.body;
  const { year } = req.body;
  const { email } = req.body;
  const { password } = req.body;

  if (!name || !year || !email || !password || !email.toLowerCase().includes('dartmouth.edu')) {
    res.status(422).send('You must provide a Dartmouth email and password, as well as a name and year.');
    next();
  } else {
    // if user exists already, error
    User.find({ email })
      .then((user) => {
        if (user.length > 0) { // user already exists
          res.status(409).send('This email user already exists.');
          next();
        } else { // user does not exist yet; proceed
          const newUser = new User();
          newUser.name = name;
          newUser.year = year;
          newUser.email = email;
          newUser.password = password;
          newUser.save()
            .then((result) => {
              res.send({ token: tokenForUser(result) });
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
  const { requestID } = req.body;
  // eslint-disable-next-line consistent-return
  User.findById(userID, (err, user) => {
    if (err) return err;
    if (!user) return res.send();

    user.matches.push(requestID);

    user.save((err) => {
      if (err) return res.send(err);
      requestController.deleteRequestUser(requestID);
      return res.send();
    });
  });
};

export const getMatches = (req, res) => {
  User.findById(req.user.id, 'matches').populate({
    path: 'matches',
    // Get the requester's user info
    populate: { path: 'requester' },
  })
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
