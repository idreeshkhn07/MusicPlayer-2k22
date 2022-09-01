const mongoose = require("mongoose");
const fileUpload = require('express-fileupload');

mongoose.connect(process.env.MONGO_URL)

const connection = mongoose.connection;

connection.on("connected" , () =>{
    console.log('MongodbDB is connected');
});


connection.on("error" , (err) => {
    console.log(err);
});

module.exports = connection;