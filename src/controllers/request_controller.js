
import RequestModel from '../models/request_model';

// add function here to send info to user through here
export const receiveTRequest = (req, res) => {
  // or userID = req.body.userID;
  const { userID } = req.body;

  const request = new RequestModel();
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
  RequestModel.find({ userID: req.user.id }).populate('requester')
    .then((result) => {
      res.send(result);
      // res.send(result.id);
    })
    .catch((error) => {
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
  RequestModel.findByIdAndDelete(id)
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });
};
