const validatorAgency=require('../validator/agencia.validator');

const validationAgency=(body)=>validatorAgency.Agency.validate(body);

const CtrlValidationAgency={};

CtrlValidationAgency.validate=(req,res,next)=>{
    const {body}=req;
    const response=validationAgency(body);

    if(response.error){
        return res.status(400).json({"Error":response.error});
    }
    next();
}
module.exports=CtrlValidationAgency;
