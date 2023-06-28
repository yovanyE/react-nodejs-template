var express=require('express');
var cors = require('cors');

//modulos para archivo
const path=require('path');
var app=express();


app.use(express.json());
app.use(express.urlencoded({ extended: false} ));
app.use(cors());

var agenciaRouter=require('./routes/agencia.router');
var serviceTypeRouter=require('./routes/serviceType.router');
var serviceAgencyRouter=require('./routes/serviceAgency.router');

app.use('/agencia',agenciaRouter);
app.use('/serviceType',serviceTypeRouter);
app.use('/serviceAgency',serviceAgencyRouter);

///ver imagenes guardadas
app.use('/subidas',express.static(path.resolve('../Agencia/subidas')));

app.use('/',function(req,res,next){
    return res.status(200).json({"status":"hola mundo"});
}
);

module.exports=app;