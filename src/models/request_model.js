import mongoose, { Schema } from 'mongoose';

// create a PostSchema with a title field
const RequestSchema = new Schema({
  userID: { type: Schema.Types.ObjectId, ref: 'User' },
  type: String,
  postID: { type: Schema.Types.ObjectId, ref: 'Post' },
  requester: { type: Schema.Types.ObjectId, ref: 'User' },

}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
});


// create PostModel class from schema
const RequestModel = mongoose.model('Request', RequestSchema);


export default RequestModel;
