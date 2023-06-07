const { response } = require("express");
const User = require("../models/user");
const bcryptjs = require('bcryptjs');
const { generateJWT } = require("../helpers/generatejwt");


const login = async (req, res = response) => 
{
    const { email, password} = req.body;

 
    try { 
        const user = await User.findOne({ email });
        if (!user)
        {
            return res.status(400).json({ 
                msg: 'User/email not found - email',
                user
            });
        }
        
        if (!user.state)
        {
            return res.status(400).json({ 
                msg: 'User/email not found - state is false',
                user
            });
        }

        const validPassword = bcryptjs.compareSync(password, user.password);
        
        if (!validPassword){
            return res.status(400).json({ 
                msg: 'User/password not found - password is incorrect',
                user
            });
        }

        const token = await generateJWT(user.id);

        res.json({
            user,
            token
        })
    } catch (error) {
        return res.status(500).json({
                 msg:'This operation failed'
            });
    }


    
    
}



module.exports = {
    login
}