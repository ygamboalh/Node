const { Category, Product } = require('../models');
const Role = require('../models/role');
const User = require('../models/user');

const isValidRole = async (role = '') => {
    const roleExist = await Role.findOne( { role });
    if(!roleExist){
        throw new Error(`Role ${role} does not exist`);
    }
};


const emailExist = async (email = '') => 
{
    const emailExists = await User.findOne({email});
    if (emailExists) 
    {
       throw new Error(`The email ${email} already exists`);
    }
};

const userExistById = async (id) => 
{
    const userExists = await User.findById(id);
    if (!userExists) 
    {
       throw new Error(`The id ${id} do not exists`);
    }
};

const categoryExistsById = async (id) => 
{
    const categoryExists = await Category.findById(id);
    if (!categoryExists) 
    {
       throw new Error(`The category with id:  ${id} do not exists`);
    }
};

const productExistsById = async (id) => 
{
    const productExists = await Product.findById(id);
    if (!productExists) 
    {
       throw new Error(`The product with id:  ${id} do not exists`);
    }
};

module.exports = {
    isValidRole,
    emailExist,
    userExistById,
    categoryExistsById,
    productExistsById
}