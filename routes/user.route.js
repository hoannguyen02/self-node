const express = require('express');

const router = express.Router();

const { signup, signin, getUsers } = require('../controllers/user.controller');
router.get('/', getUsers);

router.post('/signin', signin);

router.post('/signup', signup);

module.exports = router;
