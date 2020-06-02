import jwt from 'jwt-simple';
import dotenv from 'dotenv';
import User from '../models/user_model';

dotenv.config({ silent: true });

export const signin = (req, res, next) => {
  res.send({ token: tokenForUser(req.user) });
  next();
};

export const signup = (req, res, next) => {
  const { email } = req.body;
  const { password } = req.body;

  if (!email || !password || !email.toLowerCase().includes('dartmouth.edu')) {
    res.status(422).send('You must provide a Dartmouth email and password');
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

// encodes a new token for a user object
function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, process.env.AUTH_SECRET);
}
