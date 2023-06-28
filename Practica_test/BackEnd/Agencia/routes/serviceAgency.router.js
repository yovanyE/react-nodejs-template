var express=require('express');
var router=express.Router();

var serviceAgencycontroller=require('../controller/serviceAgency.controller');

router.post('/',serviceAgencycontroller.addAgencyService);
router.get('/',serviceAgencycontroller.getAllAgencyService);
router.post('/byName',serviceAgencycontroller.getAgencuSerciByNameAgency);


module.exports=router;