const mongoose = require('mongoose');

const dbConnection = async () => 
{
    try 
    {
        await mongoose.connect('mongodb://127.0.0.1:27017/NodeApp',{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            //useCreateIndex: true,
            //useFindAndModify: false

        });

        console.log('Database connection established');

    } catch (error) {
        console.log(error);
        throw new Error('I couldnt connect to Mongo');
    }

}


module.exports =
{
    dbConnection
}