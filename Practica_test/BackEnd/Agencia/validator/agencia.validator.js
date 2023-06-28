const Joi=require('joi');

const CtrValidAgencia={};

CtrValidAgencia.Agency=Joi.object({
    nombre: Joi.string().required(),
    latitud: Joi.number().required(),
    longitud: Joi.number().required(),
    cant_personas:Joi.number().optional(),
    capacidad_personas:Joi.number().optional(),
    idagencia:Joi.number().optional(),
    foto: Joi.string().optional()
});

module.exports=CtrValidAgencia;
