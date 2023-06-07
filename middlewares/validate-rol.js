const { response } = require("express");




const isAdminRole = (req, res = response, next) =>{

    if(!req.user){
        return res.status(500).json({
            msg:'You must validate your token first'
        });
    }

    const { role, name } = req.user;

    if (role !== 'ADMIN'){
        return res.status(401).json({
            msg:`${name} is not an administrator`
        });
    }
    next();
}


const hasRole = (...roles) => {

    return (req, res, next) => {

        if(!req.user){
            return res.status(500).json({
                msg:'You must validate your token first'
            });
        }
        if(!roles.includes (req.user.role)){
            return res.status(401).json({
                msg: `You need to have one of this roles ${roles}`
            });
        }
        next();
    };

};




module.exports = {
    isAdminRole, 
    hasRole
}