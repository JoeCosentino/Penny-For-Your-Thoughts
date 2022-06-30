const router = require('express').Router();
const {
    addThought,
    // addReaction,
    removeReaction,
    removeThought,
    updateThought,
    getAllThoughts
} = require('../../controllers/thought-controller');

router
    .route('/')
    .get(getAllThoughts)
    .post(addThought);

router
    .route('/:id')
    .put(updateThought)
    .delete(removeThought);

router
    .route('/:userId/:thoughtId/:reactionId')
    .delete(removeReaction);
    // .put(addReaction)


module.exports = router;