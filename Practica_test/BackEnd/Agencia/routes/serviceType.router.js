var express=require('express');
var router=express.Router();

var controllerServiceType=require('../controller/serviceType.controller');
var validationAgency=require('../validation/serviceType.validation');


router.post('/',validationAgency.ValidateTypeService,controllerServiceType.addService);
router.put('/',validationAgency.ValidateTypeService,controllerServiceType.updateService);
router.get('/',controllerServiceType.getAllServiceType);

module.exports=router;
