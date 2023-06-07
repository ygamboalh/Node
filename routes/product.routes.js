const { Router } = require('express');
const { check } = require('express-validator');

const { validateJWT, validate, isAdminRole } = require('../middlewares');
const { createProduct, getProduct ,getProducts, updateProduct, deleteProduct } = require('../controllers/product.controller');
const { productExistsById, categoryExistsById } = require('../helpers/db-validators');

const router = Router();



router.get('/', getProducts);
router.get('/:id', [
    check('id','The product id is not valid').isMongoId(),
    check('id').custom(productExistsById),
    validate
],getProduct);
router.post('/',[
    validateJWT,
    check('name','The product Name is required').not().isEmpty(),
    check('category','The id of the product Is not valid').isMongoId(),
    check('category').custom(categoryExistsById),
    validate
], createProduct);

router.put('/:id',[
    validateJWT,
    check('category','The id of the product Is not valid').isMongoId(),
    check('id').custom(productExistsById),
    validate
], updateProduct);

router.delete('/:id', [
    validateJWT,
    isAdminRole,
    check('id','The id of the product Is not valid').isMongoId(),
    check('id').custom(productExistsById),
    validate
], deleteProduct);



module.exports = router;