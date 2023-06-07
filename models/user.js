const {Schema, model} = require('mongoose');

const UserSchema = Schema({
    name: 
    {
        type: String,
        required: [true, 'You must say the name']

    },
    email: 
    {
        type: String,
        required: [true, 'You must say the email'],
        unique: true

    },
    password:  
    {
        type: String,
        required: [true, 'You must say the password']
    },
    image:  
    {
        type: String
    },
    role:  
    {
        type: String,
        required: [true, 'You must say the role']
    },
    state:  
    {
        type: Boolean,
        default: true
    },
});


UserSchema.methods.toJSON = function()
{
    const { __v, password, _id, ...user} = this.toObject();
    user.uid = _id;
    return user;
}

module.exports = model ('User',UserSchema);