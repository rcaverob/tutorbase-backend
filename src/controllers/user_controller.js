import jwt from 'jwt-simple';
import dotenv from 'dotenv';
import User from '../models/user_model';
import Request from '../models/request_model';

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

// add function here to send info to user through here
export const receiveTRequest = (req, res, next) => {
  // or userID = req.body.userID;
  const { userID } = req.body;

  const request = new Request();
  request.userID = userID;
  request.type = req.body.type;
  request.requester = req.user.id;
  request.postID = req.body.postID;
  request.save()
    .then((result) => {
      res.send(result);
      // res.send(result.id);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const showTRequest = (req, res) => {
  // res.send('ehy?');
  Request.find({ userID: req.user.id })
    .then((result) => {
      res.send(result);
      // res.send(result.id);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};


// encodes a new token for a user object
function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, process.env.AUTH_SECRET);
}
