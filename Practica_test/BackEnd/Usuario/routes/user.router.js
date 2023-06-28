var express=require('express');
var router=express.Router();
var upload=require('../libs/multer');

const userController=require('../controller/user.controller');

router.post('/',upload.single('foto'),userController.createUser);
router.put('/',upload.single('foto'),userController.updateUser);

router.get('/',userController.getUser);

module.exports=router;