/* eslint-disable */

import RequestModel from '../models/request_model';
import User from '../models/user_model';

// add function here to send info to user through here
export const receiveTRequest = (req, res) => {
  // or userID = req.body.userID;
  const requestedPostID = req.body.postID;
  const { userID } = req.body;

  // Add requested post to user's list:
  User.findByIdAndUpdate(
    req.user.id,
    { $push: { requestedPostIDs: requestedPostID } },
    { new: true }
  )
    .then((response) => {
      console.log('Addition of ID succesful!!');
    })
    .catch((error) => {
      console.log('ERRORRR: ');
      console.log(error);
      res.send(error);
    });

  const request = new RequestModel();
  request.userID = userID;
  request.type = req.body.type;
  request.requester = req.user.id;
  request.postID = requestedPostID;
  request
    .save()
    .then((result) => {
      res.send(result);
      // res.send(result.id);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const showTRequest = (req, res) => {
  RequestModel.find({
    userID: req.user.id,
    $or: [{ type: 'tutors' }, { type: 'tutees' }],
  })
    .populate('requester')
    .populate('postID')
    .then((result) => {
      res.send(result);
      // res.send(result.id);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const getMyRequests = (req, res) => {
  console.log('Getting My requests');
  RequestModel.find({
    requester: req.user.id,
    $or: [{ type: 'tutors' }, { type: 'tutees' }],
  })
    .populate('userID')
    .populate('postID')
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      console.log('ERRor');
      res.status(500).json({ error });
    });
};

export const declineRequest = (req, res) => {
  // res.send(req.params.id);
  RequestModel.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      res.send(error);
    });
};

export const deleteRequestUser = (id) => {
  const change = {
    type: null,
  };
  RequestModel.findByIdAndUpdate(id, change, { new: true })
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });
};
