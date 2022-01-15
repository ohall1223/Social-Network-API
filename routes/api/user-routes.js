// require express router
const router = require('express').Router();

// set requirements (from users-controller)
const {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} = require('../../controllers/user-controller');

// directs to /api/users GET POST   
router.route('/').get(getUsers).post(createUser);

// directs to /api/users/:id GET PUT DELETE
router.route('/:id').get(getUserById).put(updateUser).delete(deleteUser);

// directrs to /api/users/:iserId/friends/:friendId POST DELETE
router.route('/:id/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;
