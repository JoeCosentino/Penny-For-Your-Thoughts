const router = require('express').Router();
const {
    getAllUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend
} = require('../../controllers/user-controller');

router
    .route('/')
    .get(getAllUser)
    .post(createUser);

router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

router
    .route('/:userId/:friendId')
    .put(addFriend)

module.exports = router;