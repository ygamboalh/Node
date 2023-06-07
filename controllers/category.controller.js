const { response } = require("express");
const { Category } = require("../models");


const getCategories = async (req, res) =>{

    const { limit = 5, from = 0 } = req.query;
    
    const categories = await Category.find({state : true})
    .populate('user','name')
    .skip(Number(from))
    .limit(Number(limit));

    const count = await Category.countDocuments({state : true});
    res.json(
        {
            count,
            categories
        });
}


const getCategory = async (req, res) =>{

    const { id } = req.params;
    
    const category = await Category.findById(id).populate('user','name');
    
    res.json(
        {
          category
        });
}

const createCategory = async (req, res = response) => {

    const name = req.body.name.toUpperCase();
    const categoryDB = await Category.findOne({name});
     if(categoryDB) {
        return res.status(400).json({
            msg: `The category ${name} already exists`
        });
    }    
    const data = {
        name,
        user: req.user._id
    };

    const category = new Category(data);
    
    await category.save();

    res.status(201).json({
        category
    });
}


const editCategory = async (req, res = response) => 
{
    const { id } = req.params;
    const { state, user, ...data } = req.body;
    data.name = data.name.toUpperCase();
    data.user = req.user._id;

    const category = await Category.findByIdAndUpdate(id, data, { new: true});

    res.json(category);
}

const deleteCategory = async (req, res = response) => 
{
    const { id } = req.params;
    const deletedCategory = await Category.findByIdAndUpdate(id, {state:false}, { new: true});

    res.json(deletedCategory);
}

module.exports = {
    createCategory,
    getCategories,
    getCategory,
    editCategory,
    deleteCategory
}