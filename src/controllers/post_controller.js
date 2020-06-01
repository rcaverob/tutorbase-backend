// import Post from '../models/post_model';

import PostModel from '../models/post_model';

export const createPost = (req, res) => {
  // diff for tutor/student
  const post = new PostModel();
  post.type = req.body.type;
  post.userID = req.body.userID;
  post.department = req.body.department;
  post.class = req.body.class;
  post.availability = req.body.availability;
  post.notes = req.body.notes;
  post.responses = req.body.responses;
  post.save()
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

export const getTuteePostsGrouped = (req, res) => {
  PostModel.aggregate([
    {
      $match: { type: 'tutee' },
    },
    {
      $project: {
        fullClass: { $concat: ['$department', '$class'] },
        department: '$department',
        class: '$class',
      },
    },
    {
      $group: {
        _id: '$fullClass',
        people: {
          $push: {
            availability: '$availability', notes: '$notes', responses: '$responses', userID: '$userID',
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

export const getTutorPostsGrouped = (req, res) => {
  PostModel.aggregate([
    {
      $match: { type: 'tutee' },
    },
    {
      $project: {
        fullClass: { $concat: ['$department', '$class'] },
        department: '$department',
        class: '$class',
      },
    },
    {
      $group: {
        _id: '$fullClass',
        people: {
          $push: {
            availability: '$availability', notes: '$notes', responses: '$responses', userID: '$userID',
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
