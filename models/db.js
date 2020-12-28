const mongoose = require('mongoose')

// connect to mongosdb
mongoose.connect('mongodb://localhost/blogDB', 
{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
 (err) => {
    if(!err){console.log('MongosDB Connection Successfull.')}
    else{console.log('Error in DB connection : '+ err)}
});