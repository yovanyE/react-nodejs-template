var express=require('express');
var path=require('path');
var cors = require('cors');

var app=express();

app.use(express.json());
app.use(cors());

app.use('/',function(req,res,next){
    return res.status(200).json({"status":"hola mundo"});
}
);

module.exports=app;