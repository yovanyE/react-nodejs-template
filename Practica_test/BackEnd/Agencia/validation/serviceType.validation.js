const validatorService=require('../validator/serviceType.validator');

const validationServiceType=(body)=>validatorService.Type.validate(body);

const serviceTypeValidation={};

serviceTypeValidation.ValidateTypeService=(req,res,next)=>{
    const {body}=req;
    const response=validationServiceType(body);

    if(response.error){
        return res.status(400).json({"Error":response.error});
    }
    next();
}
module.exports=serviceTypeValidation;