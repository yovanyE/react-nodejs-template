var agenciaCtrl={};
const mysql=require('../database');

agenciaCtrl.addAgencia=async function(req,res){
    var {nombre,latitud,longitud,cant_personas,capacidad_personas}=req.body;

    var filePath=req.file.path.split('\\')[0]+'/'+req.file.path.split('\\')[1];

    const sql=`CALL crearAgencia('${nombre}',${latitud},${longitud},${cant_personas},${capacidad_personas},'${filePath}');`;
    

    mysql.query(sql,function(err,result){
        if(!err){
            return res.status(200).json({"Success":"Agencia registrado"});
        }else{
            return res.status(400).json({"Error":err.sqlMessage});
        }
    });
}
agenciaCtrl.updateAgencia=function(req,res,next){
    var {nombre,latitud,longitud,cant_personas,capacidad_personas,idagencia,foto}=req.body;
    const sql=`CALL updateAgencia('${nombre}',${latitud},${longitud},${cant_personas},${capacidad_personas},${idagencia});`;

    mysql.query(sql,function(err,result){
        if(!err){
            return res.status(200).json({"idagencia":idagencia,
            "nombre":nombre,
            "latitud":latitud,
            "longitud":longitud,
            "cant_personas":cant_personas,
            "capacidad_personas":capacidad_personas,
            "foto":foto
            });
            return res.status(200).json({"Success":"Agencia actualizada correctamente"});
        }else{
            return res.status(400).json({"Error":err.sqlMessage});
        }
    });
}
agenciaCtrl.updateAgenciaWithPhoto=function(req,res,next){
    var {idagencia, foto}=req.body;
    if(req.file){
        foto=req.file.path.split('\\')[0]+'/'+req.file.path.split('\\')[1];
    }
    const sql=`CALL updatePhotoAgencia(${idagencia},'${foto}')`;
    mysql.query(sql,function(err,result){
        if(!err){
            return res.status(200).json({"Success": "foto actualizada"});
        }else{
            return res.status(400).json({"Error": err.sqlMessage});
        }
    });

}
agenciaCtrl.eliminarAgencia=function(req,res,next){
    const sql=`CALL eliminarAgencia(${req.params.idagencia})`;

    mysql.query(sql,function(err,result){
        if(!err){
            return res.status(200).json({"Success":"Agencia eliminado correctamente"});
        }else{
            return res.status(400).json({"Error":err.sqlMessage});
        }
    });
}
agenciaCtrl.getAllAgencia=async function(req,res,next){
    const sql=`CALL consultarAgencia();`;
    mysql.query(sql,function(err,result){
        if(!err){
            if(result[0].length>0){
                return res.status(200).json(result[0]);
            }else{
                return res.status(404).json({"warning":"No data found"});
            }
        }else{
            //return next(err);
            return res.status(400).json({"Error":err.sqlMessage});
        }
    });
   
    //return res.status(200).json({"hola":"hola mundo cruel basura"})
}
agenciaCtrl.getAgenciaById=function(req,res,next){
    const sql=`CALL consultarAgenciaForId(${req.params.idagencia})`;
    mysql.query(sql,function(err,result){
        if(!err){
            if(result[0].length>0){
                return res.status(200).json(result[0]);
            }else{
                return res.status(404).json({"warning":"No data found"});
            }
        }else{
            return res.status(400).json({"Error":err.sqlMessage});
        }
    });
}

module.exports=agenciaCtrl;