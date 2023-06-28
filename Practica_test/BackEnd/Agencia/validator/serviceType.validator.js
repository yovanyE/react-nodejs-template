const Joi=require('joi');

const serviceTypeV={};

serviceTypeV.Type=Joi.object({
    descripcion: Joi.string().required(),
    idtiposervicio: Joi.number().optional()
});

module.exports=serviceTypeV;
 