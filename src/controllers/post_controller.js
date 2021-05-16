// import Post from '../models/post_model';
import PostModel from '../models/post_model';

export const createPost = (req, res) => {
  // diff for tutor/student
  const post = new PostModel();
  post.type = req.body.type;
  post.userID = req.user.id;
  post.department = req.body.department;
  post.class = req.body.class;
  post.availability = req.body.availability;
  post.notes = req.body.notes;
  post.responses = req.body.responses;
  post.userObjID = req.user.id;
  post
    .save()
    .then((result) => {
      res.json({ result });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const getTutorPosts = (req, res) => {
  PostModel.find({ type: 'tutor' })
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const getTuteePosts = (req, res) => {
  // diff for tutor/student
  PostModel.find({ type: 'tutee' })
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const getPostsGrouped = (req, res, type) => {
  PostModel.aggregate([
    {
      $match: { type },
    },
    {
      $lookup: {
        from: 'users',
        localField: 'userObjID', // field in the orders collection
        foreignField: '_id', // field in the items collection
        as: 'userArr',
      },
    },
    {
      $project: {
        user: { $arrayElemAt: ['$userArr', 0] },
        fullClass: { $concat: ['$department', '$class'] },
        availability: '$availability',
        userID: '$userID',
        notes: '$notes',
        responses: '$responses',
        postID: '$_id',
      },
    },
    {
      $group: {
        _id: '$fullClass',
        people: {
          $push: {
            availability: '$availability',
            notes: '$notes',
            responses: '$responses',
            userID: '$userID',
            postID: '$postID',
            user: '$user',
          },
        },
      },
    },
  ])
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const getPostsByUser = (req, res, type) => {
  PostModel.find({ type, userID: req.user.id })
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const getTutorsByUser = (req, res, type) => {
  PostModel.find({ type, userID: req.user.id })
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error });
    });
};

export const getPost = (req, res) => {
  PostModel.findById(req.params.id)
    .then((result) => {
      res.json({ post: result });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const deletePost = (req, res) => {
  PostModel.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      res.status(200).json({ error });
    });
};

// export const updatePost = (req, res) => {
//   res.send('update a post here');
// };
