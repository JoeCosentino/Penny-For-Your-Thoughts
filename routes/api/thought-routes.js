const router = require('express').Router();
const {
    addThought,
    addReaction,
    removeReaction
} = require('../../controllers/thought-controller');

router
    .route('/:userId')
    .post(addThought);

router
    .route('/:userId/:thoughtId')
    .put(addReaction);

router
    .route('/:userId/:thoughtId/:reactionId')
    .delete(removeReaction);

module.exports = router;