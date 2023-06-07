const { Router } = require('express');
const { check } = require('express-validator');

const { validateJWT, validate, isAdminRole } = require('../middlewares');
const { createCategory, getCategory ,getCategories, editCategory, deleteCategory } = require('../controllers/category.controller');
const { categoryExistsById } = require('../helpers/db-validators');

const router = Router();



router.get('/', getCategories);
router.get('/:id', [
    check('id','The id of the category is not valid').isMongoId(),
    check('id').custom(categoryExistsById),
    validate
],getCategory);
router.post('/',[
    validateJWT,
    check('name','Category Name is required').not().isEmpty(),
    validate
], createCategory);

router.put('/:id',[
    validateJWT,
    check('name','Category Name is required').not().isEmpty(),
    check('id').custom(categoryExistsById),
    validate
], editCategory);

router.delete('/:id', [
    validateJWT,
    isAdminRole,
    check('id','The id of the category is not valid').isMongoId(),
    check('id').custom(categoryExistsById),
    validate
], deleteCategory);



module.exports = router;