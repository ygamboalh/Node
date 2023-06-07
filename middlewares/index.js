const  validate  = require('../middlewares/validate');
const  validateJWT = require('../middlewares/validate-jwt');
const  validateRoles  = require('../middlewares/validate-rol');



module.exports = {
    ...validate,
    ...validateJWT,
    ...validateRoles,
}