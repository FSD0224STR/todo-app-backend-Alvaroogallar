const express = require('express');
const { getUser, logUser } = require('../Controllers/userController');

const router = express.Router();


router.get ('/', getUser)
router.post ('/login', logUser )

module.exports = router