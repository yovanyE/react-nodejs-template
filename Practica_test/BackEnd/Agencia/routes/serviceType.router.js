var express=require('express');
var router=express.Router();

var controllerServiceType=require('../controller/serviceType.controller');
var validationAgency=require('../validation/serviceType.validation');
var serviceTypeService=require('../service/serviceTypeSservice');


router.post('/',validationAgency.ValidateTypeService,async (req,res,next)=>{   
    const result=await serviceTypeService.createTypeService(req.body)
        .then(result=>{
            res.status(200).json({status:true,value:result[0]});
        }).catch(error=>{
            res.status(400).json({status:false,value:error.sqlMessage});
        });
});
router.put('/',validationAgency.ValidateTypeService, async(req,res,next)=>{
    const result=await serviceTypeService.UpdateTypeService(req.body)
    .then(result=>{
        res.status(200).json({status:true,value:result[0]});
    }).catch(error=>{
        res.status(400).json({status:false,value:error});
    });
});
router.get('/', async(req,res,next)=>{
    const result=await serviceTypeService.getAllServiceType()
    .then(result=>{
        res.status(200).json({status:true,value:result[0]})
    }).catch(error=>{
        res.status(400).json({status:false,value:error});
    })
});
router.delete('/',async(req,res,next)=>{
    try {
        const result = await controllerServiceType.deleteServiceType(req.body);
        return res.status(200).json({ status: true, value: result[0] });
    } catch (error) {
        return res.status(400).json({ status: false, value: error });
    }
});

module.exports=router;
