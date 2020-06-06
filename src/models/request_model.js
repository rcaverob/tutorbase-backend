import mongoose, { Schema } from 'mongoose';

// create a PostSchema with a title field
const RequestSchema = new Schema({
  userID: String,
  type: String,
  postID: String,
  requester: { type: Schema.Types.ObjectId, ref: 'User' },

}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
});


// create PostModel class from schema
const PostModel = mongoose.model('Request', RequestSchema);


export default PostModel;
