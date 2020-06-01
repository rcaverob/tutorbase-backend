import { Router } from 'express';
import * as Posts from './controllers/post_controller';


const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'welcome to our blog api!' });
});

// /your routes will go here

router.route('/tutors')
  .post(Posts.createPost)
  .get(Posts.getTutorPosts);

router.route('/tutees')
  .post(Posts.createPost)
  .get(Posts.getTuteePosts);

router.route('/tuteesGrouped')
  .get(Posts.getTuteePostsGrouped);

router.route('/tutorsGrouped')
  .get(Posts.getTutorPostsGrouped);

router.route('/posts/:id')
  .get(Posts.getPost)
  .delete(Posts.deletePost);


export default router;
