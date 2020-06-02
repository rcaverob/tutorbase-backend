import mongoose, { Schema } from 'mongoose';

// create a PostSchema with a title field
const UserSchema = new Schema({
  userID: Number,
  name: String,
  year: Number,
  availability: String,
  tutorRequestIDs: [Number],
  tuteeRequestIDs: [Number],
  matches: [],
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
});


// create PostModel class from schema
const UserModel = mongoose.model('User', UserSchema);


export default UserModel;
