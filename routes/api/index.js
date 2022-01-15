// link express router
const router = require('express').Router();

// set routes
const usersRoutes = require('./user-routes');
const thoughtsRoutes = require('./thought-routes');

// add /users to created routes
router.use('/users', usersRoutes);

router.use('/thoughts', thoughtsRoutes);

module.exports = router;