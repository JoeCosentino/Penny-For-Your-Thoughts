const router = require('express').Router();
const userRoutes = require('./user-routes');

// add respective prefixes
router.use('/users', userRoutes);

module.exports = router;