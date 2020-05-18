const router = require('express').Router();
const userController = require('../controllers/user');
const authentication = require('../middleware/authentication');
const authorization = require('../middleware/authorization');

router.post('/signin', userController.signIn);

router.use(authentication);
router.post('/signup', authorization.adminOnly, userController.signUp);
router.get('/', userController.getUser);
router.put('/:userId', authorization.adminOnly, userController.editUser);

module.exports = router;
