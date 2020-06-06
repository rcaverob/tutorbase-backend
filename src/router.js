import { Router } from 'express';
import * as Posts from './controllers/post_controller';
import * as UserController from './controllers/user_controller';
import { requireAuth, requireSignin } from './services/passport';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'welcome to our tutorbase api!' });
});

// /your routes will go here
router.route('/tutors')
  .post(requireAuth, (req, res) => {
    Posts.createPost(req, res);
  })
  .get(Posts.getTutorPosts);

// These routes are for receiving and showing request
router.route('/tutorsReq')
  .post(requireAuth, (req, res) => {
    UserController.receiveTRequest(req, res);
  });

router.route('/tuteesReq')
  .post(requireAuth, (req, res) => {
    UserController.receiveTRequest(req, res);
  });

router.route('/requests')
  .get(requireAuth, UserController.showTRequest);
router.route('/tutees')
  .post(requireAuth, (req, res) => {
    Posts.createPost(req, res);
  })
  .get(Posts.getTuteePosts);

router.route('/tuteesGrouped')
  .get(Posts.getTuteePostsGrouped);

router.route('/tutorsGrouped')
  .get(Posts.getTutorPostsGrouped);

router.route('/tutorsByUser')
  .get(requireAuth, (req, res) => { Posts.getPostsByUser(req, res, 'tutor'); });

router.route('/tuteesByUser')
  .get(requireAuth, (req, res) => { Posts.getPostsByUser(req, res, 'tutee'); });

router.route('/posts/:id')
  .get(Posts.getPost)
  .delete(requireAuth, (req, res) => {
    Posts.deletePost(req, res);
  });

router.post('/signin', requireSignin, UserController.signin);

router.post('/signup', UserController.signup);

export default router;
