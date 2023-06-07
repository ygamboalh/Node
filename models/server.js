const express = require('express')
const cors = require('cors')
const { dbConnection } = require('../database/dbconfig')
const port = 8080;

class Server 
{
    constructor()
    {
        this.app = express();
        this.port = port;
        this.connectDB();
        this.middlewares();
        this.routes();
    }

    async connectDB()
    {
        await dbConnection();
    }
    middlewares ()
    {
        this.app.use(cors()); 
        this.app.use(express.json());
        this.app.use(express.static('public'));
    }
    routes()
    {
       this.app.use('/api/users', require('../routes/user.routes'));
       this.app.use('/api/roles', require('../routes/role.routes'));
       this.app.use('/api/auth', require('../routes/auth.routes'));
       this.app.use('/api/categories', require('../routes/category.routes'));
       this.app.use('/api/products', require('../routes/product.routes'));
       this.app.use('/api/search', require('../routes/search.routes'));
    }
    listen()
    {
        this.app.listen(this.port, ()=> {
            console.log(`listening on port ${this.port}`);
        });
    }
    
}

module.exports = Server;