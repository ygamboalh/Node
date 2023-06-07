const { Schema, model } = require("mongoose");

const ProductSchema = Schema(
    {
        name: 
        {
            type: String,
            required: [true, 'Name is required'],
            unique: true,
        },
        state: 
        {
            type: Boolean,
            default: true,
            required: [true, 'State is required'],
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'User is required']
        },
        precio: {
            type: Number,
            default: 0,
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: 'Category',
            required: [true, 'Category is required']
        },
        description: {
            type: String,
        },
        available: {
            type: Boolean,
            default: true,
        },

    });

ProductSchema.methods.toJSON = function()
    {
        const { __v, state, ...product} = this.toObject();
        return product;
    }

module.exports = model('Product',ProductSchema);