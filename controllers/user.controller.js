const { response, request  } = require('express');
const User = require('../models/user');
const bcryptjs = require('bcryptjs');

const usersGet = async (req, res = response) => {
    
    const { limit = 5, from = 0 } = req.query;
    
    const users = await User.find({state : true})
    .skip(Number(from))
    .limit(Number(limit));

    const count = await User.countDocuments({state : true});
    res.json(
        {
            count,
            users
        });
  }

  const usersPost = async (req, res) => {
    
    const { name, email, password, role } = req.body; 
    const user = new User({name, email, password, role});
    
    //verify that if the email exists
    
    //the hash of the password
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);
 
    await user.save();
    res.json(
        {
            user
        });
  }

  const usersPut = async(req, res = response) => {
    
    const { id } = req.params; 
    const {_id, password, email, ...rest} = req.body;

    if (password)
    {
        const salt = bcryptjs.genSaltSync();
        rest.password = bcryptjs.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate(id, rest);
    res.json(
        {
            user
        });
  }

  const usersDelete = async (req, res = response) => {
   
    const { id } = req.params;

    const user = await User.findByIdAndUpdate(id, {state:false});
    res.json(
        {
            user
        });
  }





  module.exports = 
  {
    usersGet,
    usersPut,
    usersPost,
    usersDelete,
  }