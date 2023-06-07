const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth.controller');
const { validate } = require('../middlewares/validate');




const router = Router();

router.post('/login',[
    check('email','You have to say the email').isEmail(),
    check('password','You have to say the password').not().isEmpty(),
    validate
], login);



module.exports = router;