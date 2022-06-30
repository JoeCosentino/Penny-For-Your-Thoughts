const router = require('express').Router();
const {
    addThought,
    addReaction,
    removeReaction,
    removeThought
} = require('../../controllers/thought-controller');

router
    .route('/:userId')
    .post(addThought);

router
    .route('/:userId/:thoughtId')
    .put(addReaction)
    .delete(removeThought);

router
    .route('/:userId/:thoughtId/:reactionId')
    .put(removeReaction);

module.exports = router;