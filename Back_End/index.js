//main file.
const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');

const PORT = 3000;

//import routers
const userRoute = require('./routes/user');

//connect to mongo.
const {connectToDb} = require('./connect');

 connectToDb('mongodb://localhost:27017/oj_db').then(()=> console.log('connected to mongodb successfully'));

 //some middleware stuff.
 app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}))
 app.use(express.json());
 app.use(express.urlencoded({extended:false}));
 app.use(cookieParser());


 //it's to to establis routes.
 //go in routes and controller function.

 app.use('/',userRoute);



app.listen(PORT,()=>{
    console.log(`Server is Listening on PORT ${PORT}`);
    
})

