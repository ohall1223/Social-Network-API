// require express router
const router = require('express').Router();

// set requirements
const {
    getAllThoughts,
    getThoughtsById,
    createThoughts,
    addReaction,
    deleteReaction,
    updateThoughts,
    deleteThoughts
} = require('../../controllers/thought-controller');

// direct to /api/thoughts GET
router.route('/').get(getAllThoughts)

// direct to /api/thoughts/:thoughtid GET PUT DELETE
router.route('/:thoughtId').get(getThoughtsById).put(updateThoughts).delete(deleteThoughts);

// direct to /api/thoughts/:userId POST
router.route('/:id').post(createThoughts);

// directs to /api/thoughts/:thoughtId/reactions POST
router.route('/:thoughtId/reactions/:reactionId').post(addReaction);

// direct to /api/thoughts/:thoughtId/reactionId DELETE
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;