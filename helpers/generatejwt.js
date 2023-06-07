const jwt = require('jsonwebtoken');


const generateJWT = ( uid = '' ) =>{

    return new Promise((resolve, reject) => {
        const payload = { uid};

        jwt.sign(payload, 'ThisisPrivate', {
            expiresIn: '4h'
        }, (err, token) => {
            if (err) {
                reject('Could not generate token');
            }
            else 
            {
                resolve(token);
            }
        })

    })
}




module.exports = 
{
    generateJWT
}