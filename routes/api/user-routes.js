const router = require('express').Router();
const {
    getAllUser,
    getUserById,
    createUser,
    updateUser
} = require('../../controllers/user-controller');

// GET and POST at /api/users
router
    .route('/')
    .get(getAllUser)
    .post(createUser);

router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)

module.exports = router;