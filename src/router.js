import { Router } from 'express';
import * as Posts from './controllers/post_controller';
import * as UserController from './controllers/user_controller';
import { requireAuth, requireSignin } from './services/passport';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'welcome to our blog api!' });
});

// /your routes will go here
router.route('/tutors')
  .post(requireAuth, (req, res) => {
    Posts.createPost(req, res);
  })
  .get(Posts.getTutorPosts);

router.route('/tutees')
  .post(requireAuth, (req, res) => {
    Posts.createPost(req, res);
  })
  .get(Posts.getTuteePosts);

router.route('/tuteesGrouped')
  .get(Posts.getTuteePostsGrouped);

router.route('/tutorsGrouped')
  .get(Posts.getTutorPostsGrouped);

router.route('/posts/:id')
  .get(Posts.getPost)
  .delete(requireAuth, (req, res) => {
    Posts.deletePost(req, res);
  });

router.post('/signin', requireSignin, UserController.signin);

router.post('/signup', UserController.signup);

export default router;
