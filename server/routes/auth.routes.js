const { registration, authorization, logout } = require('../controller/userController');


const router = require('express').Router();

router.route('/registration').post(registration)
router.route('/authorization').post(authorization)
router.route('/logout').delete(logout)

module.exports = router;