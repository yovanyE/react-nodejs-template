var express=require('express');
var path=require('path');
var cors = require('cors');
var app=express();

app.use(express.json());
app.use(cors());

var userRouter=require('./routes/user.router');
var loginRouter=require('./routes/login.router');

app.use('/users',userRouter);
app.use('/ingresar',loginRouter);


app.use('/',function(req,res,next){
    return res.status(200).json({"status":"hola mundo"});
}
);

module.exports=app;