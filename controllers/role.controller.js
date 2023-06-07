const { response, request  } = require('express');
const Role = require('../models/role');

const rolesGet = (req, res = response) => {
    
    const roles = Role.count;

    res.json(
        {
            msg:'get role api controller',
            roles
        });
  }

  const rolesPost = async (req, res) => {
    
    const { role } = req.body; 
    const roleNew = new Role({role});
    
    await roleNew.save();
    res.json(
        {
            roleNew
        });
  }
  module.exports = 
  {
    rolesGet,
    rolesPost
  }