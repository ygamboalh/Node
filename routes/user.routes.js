const { Router } = require('express');
const { usersGet, usersPut, usersPost, usersDelete } = require('../controllers/user.controller');
const { check } = require('express-validator');
const { isValidRole, emailExist, userExistById } = require('../helpers/db-validators');

const { validate, isAdminRole, hasRole, validateJWT } = require('../middlewares');

const router = Router();

router.get('/', usersGet);
router.put('/:id',[
    check('id','The id of the user is not valid').isMongoId(),
    check('id').custom(userExistById),
    check('role').custom( isValidRole),
    validate,
], usersPut);
router.post('/',[
    check('name','User Name is required').not().isEmpty(),
    check('email','User Email address is invalid').isEmail(),
    check('password','User Password is required').isLength({min:6}),
    check('role').custom( isValidRole),
    check('email').custom( emailExist),
    validate
], usersPost);
router.delete('/:id',[
    validateJWT,
    isAdminRole,
    hasRole('ADMIN','SELLER'),
    check('id','The id of the user is not valid').isMongoId(),
    check('id').custom(userExistById),
    validate
], usersDelete);

module.exports = router;