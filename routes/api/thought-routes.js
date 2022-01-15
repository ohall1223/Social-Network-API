// require express router
const router = require('express').Router();

// set requirements
const {
    getAllThoughts,
    getThoughtById,
    createThought,
    addReaction,
    removeReaction,
    updateThought,
    deleteThought
} = require('../../controllers/thought-controller');

// direct to /api/thoughts GET
router.route('/').get(getAllThoughts)

// direct to /api/thoughts/:id GET PUT DELETE
router.route('/:id').get(getThoughtById).put(updateThought).delete(deleteThought);

// direct to /api/thoughts/:userId POST
router.route('/:userId').post(createThought);

// directs to /api/thoughts/:thoughtId/reactions POST
router.route('/:thoughtId/reactions/:reactionId').post(addReaction);

// direct to /api/thoughts/:thoughtId/reactionId DELETE
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = router;