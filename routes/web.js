const express = require('express');
const router = express.Router();

const { index } = require('../controllers/home');
const { OnGetRegister, OnPostRegister } = require('../controllers/register');
const { loginIndex } = require('../controllers/login');

router.get('/', index);
router.get('/login', loginIndex);
router.get('/register', OnGetRegister);

router.post('/register', OnPostRegister);

module.exports = router;