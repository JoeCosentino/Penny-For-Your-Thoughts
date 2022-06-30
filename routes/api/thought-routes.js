const router = require('express').Router();
const {
    addThought,
    addReaction
} = require('../../controllers/thought-controller');

router
    .route('/:userId')
    .post(addThought);

router
    .route('/:userId/:thoughtId')
    .put(addReaction);

module.exports = router;