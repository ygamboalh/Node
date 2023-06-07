const { Router } = require('express');
const { rolesGet, rolesPost } = require('../controllers/role.controller');

const Role = require('../models/role');

const router = Router();

router.get('/', rolesGet);
router.post('/', rolesPost);


module.exports = router;