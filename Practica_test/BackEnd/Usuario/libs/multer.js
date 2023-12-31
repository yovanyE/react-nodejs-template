const express=require('express');
const multer =require('multer');
const {v4 :  uuidv4 } = require ('uuid');
const path=require('path');

let storage=multer.diskStorage({
    destination:'./shared',
    filename:(req,file,cb)=>{
        cb(null,uuidv4() + path.extname(file.originalname));
    }
});

module.exports=multer({storage});