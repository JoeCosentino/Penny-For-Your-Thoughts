const router = require('express').Router();
const {
    addThought,
    addReaction,
    removeReaction,
    removeThought,
    // updateThought,
    getAllThoughts
} = require('../../controllers/thought-controller');

router
    .route('/')
    .get(getAllThoughts)
    .post(addThought);

router
    .route('/:id')
    .put(addReaction)
    .delete(removeThought);

router
    .route('/:userId/:thoughtId/:reactionId')
    .delete(removeReaction);


module.exports = router;