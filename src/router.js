import { Router } from 'express';
import * as Posts from './controllers/post_controller';


const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'welcome to our blog api!' });
});

// /your routes will go here

router.route('/tutors')
  .post(Posts.createPost)
  .get(Posts.getTutorPosts)
  .delete(Posts.deletePost);

router.route('/tutees')
  .post(Posts.createPost)
  .get(Posts.getTuteePosts)
  .delete(Posts.deletePost);

router.route('/posts/:id')
  .get(Posts.getPost);


export default router;
