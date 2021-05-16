/* eslint-disable */
import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

const SALT_WORK_FACTOR = 10;

// create a PostSchema with a title field
const UserSchema = new Schema(
  {
    userID: Number,
    email: { type: String, unique: true, lowercase: true },
    password: { type: String },
    name: String,
    year: Number,
    availability: String,
    requestedPostIDs: [String],
    tutorRequestIDs: [Number],
    tuteeRequestIDs: [Number],
    matches: [{ type: Schema.Types.ObjectId, ref: 'Request' }],
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

UserSchema.pre('save', function beforeUserSave(next) {
  const user = this;

  // early return
  if (!user.isModified('password')) next();
  else {
    // salt the password then store it
    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
      if (err) next(err);
      else {
        // hash the password using our new salt
        bcrypt.hash(user.password, salt, (err, hash) => {
          if (err) next(err);

          // override the cleartext password with the hashed one
          user.password = hash;
          next();
        });
      }
    });
  }
});

UserSchema.methods.comparePassword = function comparePassword(
  candidatePassword,
  callback
) {
  const user = this;

  bcrypt.compare(candidatePassword, user.password, (err, res) => {
    if (err) return callback(err);
    return callback(null, res);
  });
};

// create PostModel class from schema
const UserModel = mongoose.model('User', UserSchema);

export default UserModel;
