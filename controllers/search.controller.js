const { response } = require("express");
const { ObjectId } = require("mongoose").Types;
const { User, Category, Product } = require('../models');

const allowedCollections = [
    'users',
    'categories',
    'products'
];

const searchUsers = async (term = '', res = response) => {

    const isMondoId = ObjectId.isValid( term );

    if ( isMondoId ) {
        const user = await User.findById( term );
        return res.json( { 
            result: (user) ? user : []
        }); 
    }

    const regex = new RegExp(term, 'i');
    const users = await User.find({
       $or: [{name : regex, state: true}, { email: regex, state:true}],
       $and: [{state : true}]

    });
    return res.json({ 
        result: users
    });
}

const searchCategories = async (term = '', res) => {
    
    const isMondoId = ObjectId.isValid( term );

    if ( isMondoId ) {
        const category = await Category.findById( term );
        return res.json( { 
            result: (category) ? category : []
        }); 
    }

    const regex = new RegExp(term, 'i');
    const categories = await Category.find({ name: regex, state: true});
       
    return res.json({ 
        result: categories
    });
}

const searchProducts = async (term = '', res) => {
    
    const isMondoId = ObjectId.isValid( term );

    if ( isMondoId ) {
        const product = await Product.findById( term )
        .populate('category', 'name');
        return res.json( { 
            result: (product) ? product : []
        }); 
    }

    const regex = new RegExp(term, 'i');
    const products = await Product.find({ name: regex, state: true})
    .populate('category', 'name');
       
    return res.json({ 
        result: products
    });
}

const search = async (req, res = response) =>{

    const { collection, term } = req.params;
    
    if (!allowedCollections.includes(collection)){
        return res.status(400).json({ 
            msg: `Allowed collection are: ${allowedCollections}`
        });
    }
    switch (collection) {
        case 'users':
            searchUsers(term, res);
            break;
        case 'categories':
            searchCategories(term, res);
            break;
        case 'products':
            searchProducts(term, res);
            break;
        default:
            res.status(500).json({ 
                msg: 'I couldnt find anything'
                 });    
            break;
    }
}

module.exports = {
    search
}