const { response } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const validateJWT = async (req, res = response, next) => {

    const token = req.header('x-token');
    
    if (!token) 
    {
        return res.status(401).json({ 
            msg:'You didnt sent a token'
        });
    }

    try {

       const { uid } = jwt.verify(token,'ThisisPrivate');

       const user = await User.findById(uid);

       if (!user){
        return res.status(401).json({
            msg:'Token invalid - user does not exist'
       });
    }

        
        if(!user.state){
            return res.status(401).json({
                msg:'Token invalid - user state false'
            });
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ 
            msg: 'Invalid token'
        });    
    }
};



module.exports = {
    validateJWT
}